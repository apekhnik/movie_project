import {Request, Response, Router} from "express";
import prisma from "../prismaClient.js";
import {ContentType, ITmdbMovie, WatchStatus} from "../types/types.js";
import {Prisma} from "@prisma/client";

const profileRouter =  Router();

profileRouter.patch('/update-status', async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const { movieId, status } = req.body;

    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    if (!movieId || isNaN(Number(movieId))) {
        res.status(400).json({ error: "Valid movie ID is required" });
        return;
    }
    if (!Object.values(WatchStatus).includes(status)) {
        res.status(400).json({ error: "Invalid watch status" });
        return;
    }

    try {
        // Получаем текущий movieList пользователя
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { movieList: true },
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        //TODO
        const updatedMovieList = user.movieList.map((movieStr: any) => {
            const movie: ITmdbMovie = JSON.parse(movieStr as string);
            if (movie.id === movieId) {
                return JSON.stringify({ ...movie, status });
            }
            return movieStr;
        });

        // Заменяем весь movieList новым массивом
        await prisma.user.update({
            where: { id: userId },
            data: {
                movieList: {
                    set: updatedMovieList as Prisma.InputJsonValue[], // Явное приведение к InputJsonValue[]
                },
            },
        });

        res.json({ message: "Status updated successfully" });
    } catch (error) {
        console.error("Error updating movie status:", error);
        res.status(500).json({ error: "Failed to update status" });
    }
});

profileRouter.patch('/remove', async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const { id } = req.body;

    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: "Valid movie ID is required" });
        return;
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { movieList: true },
        });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        // Фильтруем movieList, убирая фильм с указанным movieId
        const updatedMovieList = user.movieList.filter((movieStr) => {
            const movie = JSON.parse(movieStr as string);
            return movie.id !== id;
        });

        await prisma.user.update({
            where: { id: userId },
            data: {
                movieList: {
                    set: updatedMovieList as Prisma.InputJsonValue[],
                },
            },
        });

        res.json({ message: "Movie removed successfully" });
    } catch (error) {
        console.error("Error removing movie:", error);
        res.status(500).json({ error: "Failed to remove movie" });
    }
});

profileRouter.get('/', async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, login: true, movieList: true, username: true },
    });

    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    //TODO
    const parsedMovieList = user.movieList.map((movieStr: any) => JSON.parse(movieStr as string));

    res.json({
        id: user.id,
        login: user.login,
        username: user.username,
        movieList: parsedMovieList,
    });
})

profileRouter.post('/', async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const { id, status = WatchStatus.WATCH_LATER, type = ContentType.SERIES } = req.body; // Теперь ожидаем только id
    console.log(id, status, type);
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: "Valid movie ID is required" });
        return;
    }

    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
        res.status(500).json({ error: "TMDB API key is missing" });
        return;
    }

    if (!Object.values(WatchStatus).includes(status)) {
        res.status(400).json({ error: "Invalid watch status" });
        return;
    }

    try {
        const contentType = type === ContentType.SERIES ? ContentType.SERIES : ContentType.MOVIE;
        const response = await fetch(
            `https://api.themoviedb.org/3/${contentType}/${id}?api_key=${apiKey}&language=en-US`
        );

        if (!response.ok) throw new Error(`TMDb API error: ${response.statusText}`);
        const movie: ITmdbMovie = await response.json();

        if (!movie) if (!response.ok) throw new Error(`TMDb API error: ${response.statusText}`);


        // Добавляем фильм в профиль пользователя
        const movieWithDate = {
            ...movie,
            addedAt: new Date().toISOString(),
            status,
            type
        };

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                movieList: {
                    push: JSON.stringify(movieWithDate), // Сохраняем объект с датой как строку
                },
            },
        });

        res.json({ message: "Movie added to profile", movie });
    } catch (error) {
        console.error("Error adding movie to profile:", error);
        res.status(500).json({ error: "Failed to add movie to profile" });
    }
});

export default profileRouter;

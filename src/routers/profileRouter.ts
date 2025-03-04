import { Router, Request, Response } from "express";
import prisma from "../prismaClient.js";
import {ITmdbMovie} from "../types/types.js";
import {Prisma} from "@prisma/client";
import {log} from "node:util";

const profileRouter =  Router();

profileRouter.get('/', async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id; // Доступен благодаря authMiddleware
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, login: true, movieList: true },
    });

    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    const parsedMovieList = user.movieList.map((movieStr) => JSON.parse(movieStr as string));

    res.json({
        id: user.id,
        login: user.login,
        movieList: parsedMovieList,
    });
})

profileRouter.post('/', async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const { id } = req.body; // Теперь ожидаем только id

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

    try {
        // Запрашиваем фильм с TMDb на сервере
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        if (!response.ok) throw new Error(`TMDb API error: ${response.statusText}`);
        const movie: ITmdbMovie = await response.json();

        if (!movie) if (!response.ok) throw new Error(`TMDb API error: ${response.statusText}`);


        // Добавляем фильм в профиль пользователя
         await prisma.user.update({
            where: { id: userId },
            data: {
                movieList: {
                    push: JSON.stringify(movie), // Добавляем объект фильма в массив movieList
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

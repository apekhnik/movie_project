import express, { Request, Response } from "express";
import prisma from './prismaClient.js'
import cors from "cors";
import fetch from "node-fetch";
import { config } from "dotenv";
import {ITmdbResponse} from "./types/types.js";
import authRouter from "./routers/authRouter.js";
import {authMiddleware} from "./middleware/authMiddleware.js";
import profileRouter from "./routers/profileRouter.js";

config(); // Загружаем .env

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3001" }))

app.use("/auth", authRouter);

app.use('/profile', authMiddleware, profileRouter)

// Добавляем маршрут для поиска фильмов
app.get("/search", async (req: Request, res: Response): Promise<void> => {
    const apiKey = process.env.TMDB_API_KEY;
    const query = req.query.q as string;

    if (!apiKey || !query) {
        res.status(400).json({ error: "TMDB API key or query is missing" });
        return;
    }

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1`
        );
        if (!response.ok) throw new Error(`TMDb API error: ${response.statusText}`);

        const data: ITmdbResponse = (await response.json()) as ITmdbResponse
        console.log(data, 'data')

        res.json(data.results);
    } catch (error) {
        console.error("Search movies error:", error);
        res.status(500).json({ error: "Failed to search movies" });
    }
});

app.get("/movies/top-rated", async (req: Request, res: Response): Promise<void> => {
    try {
        const apiKey = process.env.TMDB_API_KEY;
        if (!apiKey) {
             res.status(500).json({ error: "TMDB API key is missing" });
             return;
        }

        const response = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
        );
        if (!response.ok) {
            throw new Error(`TMDb API error: ${response.statusText}`);
        }


        const data: ITmdbResponse = (await response.json()) as ITmdbResponse
        // Берем только первые 10 фильмов из результата
        const topMovies = data.results.slice(0, 10);
        res.json(topMovies);
    } catch (error) {
        console.error("Error fetching top movies:", error);
        res.status(500).json({ error: "Failed to fetch top movies" });
    }
});

const server = app.listen(3000, () => console.log("Server started"));

process.on("SIGTERM", async () => {
    console.log("Shutting down...");
    await prisma.$disconnect();
    server.close();
    process.exit(0);
});

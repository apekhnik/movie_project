import express, { Request, Response } from "express";
import prisma from './prismaClient.js'
import cors from "cors";
import fetch from "node-fetch";
import { config } from "dotenv";
import {ITmdbResponse} from "./types/types.js";
import authRouter from "./routers/authRouter.js";

config(); // Загружаем .env

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3001" }))

app.use("/auth", authRouter);

app.get("/users", async (req: Request, res: Response) => {
    console.log('aaaU')
    const users = await prisma.user.findMany({
        include: { movies: true },
    });
    res.json(users);
});

app.get("/movies/top-rated", async (req: Request, res: Response): Promise<void> => {
    console.log('aaaM')
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


        // @ts-ignore
        const data: ITmdbResponse = await response.json();
        // Берем только первые 10 фильмов из результата
        const topMovies = data.results.slice(0, 10);
        console.log(data)
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

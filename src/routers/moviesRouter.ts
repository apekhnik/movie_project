import { Router, Request, Response } from "express";
import prisma from "../prismaClient.js";
import fetch from "node-fetch";
import {ITmdbMovie, ITmdbResponse} from "../types/types.js";

const moviesRouter =  Router();

moviesRouter.get("/:id", async (req: Request, res: Response): Promise<void> => {
    const apiKey = process.env.TMDB_API_KEY;
    const { id } = req.params;
    const language = (req.query.language as string) || "ru"

    if (!apiKey) {
        res.status(500).json({ error: "TMDB API key is missing" });
        return;
    }
    if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: "Valid movie ID is required" });
        return;
    }

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=${language}`
    );
    if (!response.ok) throw new Error(`TMDb API error: ${response.statusText}`);
    const data = (await response.json()) as ITmdbMovie;
    res.json(data);
})

moviesRouter.get("/", async (req: Request, res: Response): Promise<void> => {
    const apiKey = process.env.TMDB_API_KEY;
    const page = parseInt(req.query.page as string) || 1;
    const perPage = 10;
    const language = (req.query.language as string) || "ru"

    if (!apiKey) {
        res.status(500).json({ error: "TMDB API key is missing" });
        return;
    }

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=${language}&page=${page}`
        );
        if (!response.ok) throw new Error(`TMDb API error: ${response.statusText}`);
        const data = (await response.json()) as ITmdbResponse;
        const totalMovies = Math.min(data.total_results, 100); // Ограничиваем до 100 фильмов
        const totalPages = Math.ceil(totalMovies / perPage);

        res.json({
            movies: data.results.slice(0, perPage),
            totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error("Error fetching top movies:", error);
        res.status(500).json({ error: "Failed to fetch top movies" });
    }
})

export default moviesRouter;

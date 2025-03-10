import { Request, Response, Router } from "express";
import fetch from "node-fetch";
import { ITmdbResponse } from "../types/types.js";

// Интерфейс для сериала (TV show) из TMDb
interface ITmdbSeries {
    adult: boolean;
    backdrop_path: string | null;
    created_by: { id: number; name: string; profile_path: string | null }[];
    episode_run_time: number[];
    first_air_date: string;
    genres: { id: number; name: string }[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: {
        air_date: string;
        episode_number: number;
        id: number;
        name: string;
        overview: string;
        season_number: number;
    };
    name: string;
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    seasons: {
        air_date: string;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string | null;
        season_number: number;
    }[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}

const tvShowRouter = Router();

tvShowRouter.get("/", async (req: Request, res: Response): Promise<void> => {
    const apiKey = process.env.TMDB_API_KEY;
    const page = parseInt(req.query.page as string) || 1;
    const perPage = 10;
    const language = (req.query.language as string) || "ru"

    if (!apiKey) {
        res.status(500).json({ error: "TMDB API key is missing" });
        return;
    }

    const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=${language}&sort_by=vote_average.desc&vote_count.gte=50&page=${page}`
    );
    if (!response.ok) throw new Error(`TMDb API error: ${response.statusText}`);

    const data = (await response.json()) as ITmdbResponse;
    const totalAnimes = Math.min(data.total_results, 100);
    const totalPages = Math.ceil(totalAnimes / perPage);

    res.json({
        movies: data.results.slice(0, perPage),
        totalPages,
        currentPage: page,
    });
});

// GET /series/:id - детали конкретного сериала
tvShowRouter.get("/:id", async (req: Request, res: Response): Promise<void> => {
    const apiKey = process.env.TMDB_API_KEY;
    const { id } = req.params;
    const language = (req.query.language as string) || "en"

    if (!apiKey) {
        res.status(500).json({ error: "TMDB API key is missing" });
        return;
    }
    if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: "Valid series ID is required" });
        return;
    }

    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=${language}`
    );
    if (!response.ok) throw new Error(`TMDb API error: ${response.statusText}`);
    const data = (await response.json()) as ITmdbSeries;
    res.json(data);
});

export default tvShowRouter;

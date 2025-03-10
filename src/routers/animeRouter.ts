import {Request, Response, Router} from "express";
import fetch from "node-fetch";
import {ITmdbMovie, ITmdbResponse, MovieGenre} from "../types/types.js";

const animeRouter = Router();
animeRouter.get("/", async (req: Request, res: Response): Promise<void> => {
    const apiKey = process.env.TMDB_API_KEY;
    const page = parseInt(req.query.page as string) || 1;
    const perPage = 10;
    const language = (req.query.language as string) || "ru"

    if (!apiKey) {
        res.status(500).json({ error: "TMDB API key is missing" });
        return;
    }
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}&sort_by=vote_average.desc&vote_count.gte=50&with_genres=${MovieGenre.Animation}&with_keywords=210024&page=${page}`
    );

    if (!response.ok) throw new Error(`TMDb API error: ${response.statusText}`);
    const data = (await response.json()) as ITmdbResponse;
    const totalAnimes = Math.min(data.total_results, 100); // Ограничиваем до 100 фильмов
    const totalPages = Math.ceil(totalAnimes / perPage);

    res.json({
        movies: data.results.slice(0, perPage),
        totalPages,
        currentPage: page,
    });
});

animeRouter.get("/:id", async (req: Request, res: Response): Promise<void> => {
    const apiKey = process.env.TMDB_API_KEY;
    const { id } = req.params;
    const language = (req.query.language as string) || "en"

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

export default animeRouter;

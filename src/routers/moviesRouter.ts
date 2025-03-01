import { Router, Request, Response } from "express";
import prisma from "../prismaClient.js";
import fetch from "node-fetch";
import {ITmdbMovie, ITmdbResponse} from "../types/types.js";

const moviesRouter =  Router();

moviesRouter.get("/:id", async (req: Request, res: Response): Promise<void> => {
    const apiKey = process.env.TMDB_API_KEY;
    const { id } = req.params;

    if (!apiKey) {
        res.status(500).json({ error: "TMDB API key is missing" });
        return;
    }
    if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: "Valid movie ID is required" });
        return;
    }

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    );
    if (!response.ok) throw new Error(`TMDb API error: ${response.statusText}`);
    const data = (await response.json()) as ITmdbMovie;
    res.json(data);
})

moviesRouter.get("/", async (req: Request, res: Response): Promise<void> => {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
        res.status(500).json({ error: "TMDB API key is missing" });
        return;
    }
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
    );
    if (!response.ok) throw new Error(`TMDb API error: ${response.statusText}`);
    const data = (await response.json()) as ITmdbResponse;
    res.json(data.results.slice(0, 10));
})

export default moviesRouter;

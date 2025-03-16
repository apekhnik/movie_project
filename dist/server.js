import express from "express";
import prisma from './prismaClient.js';
import cors from "cors";
import fetch from "node-fetch";
import { config } from "dotenv";
import authRouter from "./routers/authRouter.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import profileRouter from "./routers/profileRouter.js";
import moviesRouter from "./routers/moviesRouter.js";
import animeRouter from "./routers/animeRouter.js";
import tvShowRouter from "./routers/tvShowRouter.js";
config(); // Загружаем .env
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3001" }));
app.use("/auth", authRouter);
app.use('/profile', authMiddleware, profileRouter);
app.use('/movies', moviesRouter);
app.use('/anime', animeRouter);
app.use('/tv', tvShowRouter);
app.get("/search", async (req, res) => {
    const apiKey = process.env.TMDB_API_KEY;
    const query = req.query.q;
    if (!apiKey || !query) {
        res.status(400).json({ error: "TMDB API key or query is missing" });
        return;
    }
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1`);
        if (!response.ok)
            throw new Error(`TMDb API error: ${response.statusText}`);
        const data = (await response.json());
        console.log(data, 'data');
        res.json(data.results);
    }
    catch (error) {
        console.error("Search movies error:", error);
        res.status(500).json({ error: "Failed to search movies" });
    }
});
const server = app.listen(3000, () => console.log("Server started"));
process.on("SIGTERM", async () => {
    console.log("Shutting down...");
    await prisma.$disconnect();
    server.close();
    process.exit(0);
});
//# sourceMappingURL=server.js.map
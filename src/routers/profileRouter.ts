import { Router, Request, Response } from "express";
import prisma from "../prismaClient.js";

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

    res.json(user);
})

profileRouter.post('/', async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const { movie } = req.body;

    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    if (!movie || typeof movie !== "object") {
        res.status(400).json({ error: "Movie object is required" });
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

        const updatedMovieList = [...user.movieList, movie];
        await prisma.user.update({
            where: { id: userId },
            data: { movieList: updatedMovieList },
        });

        res.status(200).json({ message: "Movie added successfully" });
    } catch (error) {
        console.error("Error adding movie:", error);
        res.status(500).json({ error: "Failed to add movie" });
    }
});

export default profileRouter;

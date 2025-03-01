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

export default profileRouter;

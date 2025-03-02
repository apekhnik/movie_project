import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const authRouter = Router();

// Регистрация пользователя
authRouter.post("/registration", async (req: Request, res: Response): Promise<void> => {
    const { login, password } = req.body;

    if (!login || !password) {
        res.status(400).json({ error: "Login and password are required" });
        return;
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { login } });
        if (existingUser) {
            res.status(400).json({ error: "User with this login already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                login,
                password: hashedPassword,
                movieList: [],
            },
        });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "secret", {
            expiresIn: "24h",
        });

        res.status(201).json({ token, userId: user.id });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
});

// Вход пользователя
authRouter.post("/login", async (req: Request, res: Response): Promise<void> => {
    const { login, password } = req.body;

    if (!login || !password) {
        res.status(400).json({ error: "Login and password are required" });
        return;
    }

    try {
        const user = await prisma.user.findUnique({ where: { login } });
        if (!user) {
            res.status(401).json({ error: "Invalid login or password" });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid login or password" });
            return;
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "secret", {
            expiresIn: "24h",
        });

        res.json({ token, userId: user.id });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Failed to login" });
    }
});

authRouter.get('/verify', authMiddleware, async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, login: true },
    });
    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }
    res.json({ message: "Token is valid", user });
});

export default authRouter;

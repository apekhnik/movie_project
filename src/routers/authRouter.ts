import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

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

export default authRouter;

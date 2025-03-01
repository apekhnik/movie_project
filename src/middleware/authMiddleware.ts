import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Извлекаем токен из "Bearer <token>"

    if (!token) {
        res.status(401).json({ error: "Access denied: No token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { userId: number };
        req.user = { id: decoded.userId }; // Добавляем userId в объект запроса
        next(); // Пропускаем запрос дальше
    } catch (error) {
        res.status(403).json({ error: "Invalid or expired token" });
    }
}

declare module "express" {
    interface Request {
        user?: { id: number };
    }
}

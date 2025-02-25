import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.get("/users/:id", async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: parseInt(req.params.id) },
        include: { movies: true },
    });
    res.json(user);
});
app.post("/users/:id/movies", async (req, res) => {
    const { movieId } = req.body;
    const user = await prisma.user.update({
        where: { id: parseInt(req.params.id) },
        data: {
            movieList: {
                push: { movieId: movieId, addedDate: new Date() },
            },
            movies: {
                connect: { id: movieId },
            },
        },
    });
    res.json(user);
});
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
//# sourceMappingURL=server.js.map
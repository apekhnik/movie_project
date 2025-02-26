import express from "express";
import prisma from './prismaClient.js';
import cors from "cors";
import fetch from "node-fetch";
import { config } from "dotenv";
config(); // Загружаем .env
async function seed() {
    // Очистка таблиц (опционально, чтобы начать с чистого листа)
    await prisma.user.deleteMany();
    await prisma.movie.deleteMany();
    // Создание пользователей
    const user1 = await prisma.user.create({
        data: {
            login: "alice",
            password: "password123",
            movieList: [],
        },
    });
    const user2 = await prisma.user.create({
        data: {
            login: "bob",
            password: "secure456",
            movieList: [],
        },
    });
    // Создание фильмов
    const movie1 = await prisma.movie.create({
        data: {
            name: "Inception",
            description: "A thief who steals corporate secrets through dreams.",
            type: "Sci-Fi",
        },
    });
    const movie2 = await prisma.movie.create({
        data: {
            name: "The Matrix",
            description: "A hacker discovers reality is a simulation.",
            type: "Sci-Fi",
        },
    });
    // Связывание пользователей с фильмами и добавление в movieList
    await prisma.user.update({
        where: { id: user1.id },
        data: {
            movieList: {
                push: [
                    { movieId: movie1.id, addedDate: new Date() },
                    { movieId: movie2.id, addedDate: new Date() },
                ],
            },
            movies: {
                connect: [{ id: movie1.id }, { id: movie2.id }],
            },
        },
    });
    await prisma.user.update({
        where: { id: user2.id },
        data: {
            movieList: {
                push: [{ movieId: movie2.id, addedDate: new Date() }],
            },
            movies: {
                connect: [{ id: movie2.id }],
            },
        },
    });
    console.log("Mock data added successfully!");
}
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3001" }));
app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany({
        include: { movies: true },
    });
    res.json(users);
});
app.get("/movies/top-rated", async (req, res) => {
    try {
        const apiKey = process.env.TMDB_API_KEY;
        if (!apiKey) {
            res.status(500).json({ error: "TMDB API key is missing" });
            return;
        }
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`);
        if (!response.ok) {
            throw new Error(`TMDb API error: ${response.statusText}`);
        }
        // @ts-ignore
        const data = await response.json();
        // Берем только первые 10 фильмов из результата
        const topMovies = data.results.slice(0, 10);
        console.log(data);
        res.json(topMovies);
    }
    catch (error) {
        console.error("Error fetching top movies:", error);
        res.status(500).json({ error: "Failed to fetch top movies" });
    }
});
seed()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
const server = app.listen(3000, () => console.log("Server started"));
process.on("SIGTERM", async () => {
    console.log("Shutting down...");
    await prisma.$disconnect();
    server.close();
    process.exit(0);
});
//# sourceMappingURL=server.js.map
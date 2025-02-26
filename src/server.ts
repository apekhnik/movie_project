import express, { Request, Response } from "express";
import prisma from './prismaClient.js'


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

app.get("/users", async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        include: { movies: true },
    });
    res.json(users);
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

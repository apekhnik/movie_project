import {useAuthStore} from "@/lib/store";
import {ContentType, Movie, TVShow} from "@/types/types";
import {useLanguageStore} from "@/lib/stores/languageStore";
import {log} from "node:util";

interface LoginResponse {
    token: string;
    userId: number;
    username: string;
}

interface ApiError {
    error: string;
}

export async function handleLogin(login: string, password: string): Promise<void> {
    const { login: authLogin } = useAuthStore.getState(); // Используем getState для доступа вне React
    const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
    });
    const data: LoginResponse | ApiError = await res.json();
    if (!res.ok) {
        throw new Error((data as ApiError).error || "Login failed");
    }
    authLogin((data as LoginResponse).token, (data as LoginResponse).userId, (data as LoginResponse).username);
}

export async function handleRegistration(login: string, password: string, username: string): Promise<void> {
    const { login: authLogin } = useAuthStore.getState();

    const res = await fetch("http://localhost:3000/auth/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password, username }),
    });
    const data: LoginResponse | ApiError = await res.json();
    if (!res.ok) {
        throw new Error((data as ApiError).error || "Registration failed");
    }
    authLogin((data as LoginResponse).token, (data as LoginResponse).userId, (data as LoginResponse).username);
}

export async function fetchProfile(): Promise<{ id: number; login: string; username: string; movieList: any[] }> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    const res = await fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to fetch profile");
    console.log(data)
    return data;
}

export async function fetchMovies(language: string = "en"): Promise<Movie[]> {
    const res = await fetch(`http://backend:3000/movies?language=${language}`, { cache: "no-store" });
    if (!res.ok) {
        console.error(`Failed to fetch top movies: ${res.status} ${res.statusText}`);
        throw new Error("Failed to fetch top movies");
    }
    return res.json();
}

export async function fetchMoviesPages(page: number, language: string): Promise<Movie[]> {
    const res = await fetch(`http://localhost:3000/movies?page=${page}&language=${language}`, {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch top movies");
    console.log(`http://localhost:3000/movies?page=${page}&language=${language}`)
    const data = await res.json();
    return data.movies;
}

export async function fetchMovieById(id: string, language: string): Promise<Movie> {
    const res = await fetch(`http://localhost:3000/movies/${id}?language=${language}`,
        { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch movie");

    return res.json();
}

export async function fetchAnimePages(page: number, language: string): Promise<Movie[]> {
    const res = await fetch(`http://localhost:3000/anime?page=${page}&language=${language}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch top anime");
    const data = await  res.json();
    return data.movies;
}

export async function fetchAnimeById(id: string, language: string): Promise<Movie> {
    const res = await fetch(`http://localhost:3000/anime/${id}?language=${language}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch top anime");
    return res.json();
}

export async function fetchTvShowsPages(page: number, language: string): Promise<Movie[]> {
    const res = await fetch(`http://localhost:3000/tv?page=${page}&language=${language}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch top anime");

    const data = await  res.json();
    return data.movies;
}

export async function fetchTvShowById(id: string,  language: string): Promise<TVShow> {
    const res = await fetch(`http://localhost:3000/tv/${id}?language=${language}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch tvshow");
    return res.json();
}

export async function removeMovieFromProfile(id: number): Promise<void> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    const res = await fetch("http://localhost:3000/profile/remove", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to remove movie");
}

export async function addMovieToProfileById(id: number, type: ContentType): Promise<void> {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");

    const res = await fetch("http://localhost:3000/profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ id, type }), // Отправляем только id
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to add movie");
}

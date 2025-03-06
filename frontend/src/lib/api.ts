import {useAuthStore} from "@/lib/store";
import {ContentType, Movie} from "@/types/types";

interface LoginResponse {
    token: string;
    userId: number;
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
    authLogin((data as LoginResponse).token, (data as LoginResponse).userId);
}

export async function handleRegistration(login: string, password: string): Promise<void> {
    const { login: authLogin } = useAuthStore.getState();
    const res = await fetch("http://localhost:3000/auth/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
    });
    const data: LoginResponse | ApiError = await res.json();
    if (!res.ok) {
        throw new Error((data as ApiError).error || "Registration failed");
    }
    authLogin((data as LoginResponse).token, (data as LoginResponse).userId);
}

export async function fetchProfile(): Promise<{ id: number; login: string; movieList: any[] }> {
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
    return data;
}

export async function fetchMovies(): Promise<Movie[]> {
    const res = await fetch("http://backend:3000/movies", { cache: "no-store" });
    if (!res.ok) {
        console.error(`Failed to fetch top movies: ${res.status} ${res.statusText}`);
        throw new Error("Failed to fetch top movies");
    }
    return res.json();
}

export async function fetchMovie(id: string): Promise<Movie> {
    const res = await fetch(`http://backend:3000/movies/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch movie");
    console.log('movie found');
    return res.json();
}

export async function fetchAnime(): Promise<Movie[]> {
    const res = await fetch("http://backend:3000/anime", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch top anime");
    return res.json();
}

export async function fetchTvShows(): Promise<Movie[]> {
    const res = await fetch("http://backend:3000/tv", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch top anime");
    return res.json();
}

export async function fetchAnimeById(id: string): Promise<Movie> {
    const res = await fetch(`http://backend:3000/anime/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch top anime");
    return res.json();
}

export async function fetchTvShowById(id: string): Promise<Movie> {
    const res = await fetch(`http://backend:3000/tv/${id}`, { cache: "no-store" });
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

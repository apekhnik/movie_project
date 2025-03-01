import {useAuthStore} from "@/lib/store";
import {Movie} from "@/types/types";

interface LoginResponse {
    token: string;
    userId: number;
}

interface ApiError {
    error: string;
}

// Логин
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

// Регистрация
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

export async function fetchTopMovies(): Promise<Movie[]> {
    const res = await fetch("http://backend:3000/movies/top-rated", {
        cache: "no-store", // Отключаем кэш для актуальности
    });
    if (!res.ok) throw new Error("Failed to fetch top movies");
    return res.json();
}

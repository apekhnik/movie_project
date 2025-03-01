import {useAuthStore} from "@/lib/store";

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

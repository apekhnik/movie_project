"use client";

import { useState } from "react";
import {useAuthStore} from "@/lib/store";
import {handleLogin, handleRegistration} from "@/lib/api";

export default function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { login: authLogin, logout, isAuthenticated, token } = useAuthStore();

    const onLogin = async () => {
        setError(null);
        setSuccess(null);
        try {
            await handleLogin(login, password);
            setSuccess("Successfully logged in!");
            setLogin("");
            setPassword("");
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "An unknown error occurred");
        }
    };

    const onRegister = async () => {
        setError(null);
        setSuccess(null);
        try {
            await handleRegistration(login, password);
            setSuccess("Successfully registered and logged in!");
            setLogin("");
            setPassword("");
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "An unknown error occurred");
        }
    };

    const handleLogout = () => {
        logout();
        setSuccess("Logged out successfully!");
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Login / Register</h1>
            {isAuthenticated ? (
                <div>
                    <p className="mb-2">You are logged in! Token: {token}</p>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="Login"
                        className="border p-2 mb-2 w-full rounded"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="border p-2 mb-2 w-full rounded"
                    />
                    <div className="flex gap-4">
                        <button
                            onClick={onLogin}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                        >
                            Login
                        </button>
                        <button
                            onClick={onRegister}
                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                        >
                            Register
                        </button>
                    </div>
                </div>
            )}
            {error && (
                <p className="mt-4 p-2 bg-red-100 text-red-700 rounded">{error}</p>
            )}
            {success && (
                <p className="mt-4 p-2 bg-green-100 text-green-700 rounded">{success}</p>
            )}
        </div>
    );
}

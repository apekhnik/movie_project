"use client";

import { useRouter } from "next/navigation";
import {useAuthStore} from "@/lib/store";

export function Header() {
    const { isAuthenticated, logout } = useAuthStore();
    const router = useRouter();

    const handleLoginClick = () => {
        router.push("/login");
    };

    const handleGoHomeClick = () => {
        router.push("/");
    };

    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold" onClick={handleGoHomeClick}>Movie App</h1>
                <div>
                    {isAuthenticated ? (
                        <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={handleLoginClick}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

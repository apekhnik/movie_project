"use client";


import {useAuthStore, useUiStore} from "@/lib/store";
import Link from "next/link";

export function Sidebar() {
    const { isSidebarOpen, toggleSidebar } = useUiStore();
    const { isAuthenticated, logout } = useAuthStore();

    return (
        <div
            className={`h-full bg-gray-800 text-white w-64 transition-all duration-300 ease-in-out ${
                isSidebarOpen ? "block" : "hidden md:block w-0"
            }`}
        >
            <div className="p-4">
                <button
                    onClick={toggleSidebar}
                    className="text-white bg-blue-500 px-2 py-1 rounded mb-4"
                >
                    {isSidebarOpen ? "Close" : "Open"}
                </button>
                <h2 className="text-xl font-bold">Menu</h2>
                <ul className="mt-4">
                    <li><Link href="/" className="block py-2">Home</Link></li>
                    <li><Link href="/movies" className="block py-2">Movies</Link></li>
                    <li><Link href="/tv" className="block py-2">TV Shows</Link></li>
                    <li><Link href="/anime" className="block py-2">Anime</Link></li>
                    {isAuthenticated ? (
                        <li>
                            <button onClick={logout} className="block py-2 text-red-300">
                                Logout
                            </button>
                        </li>
                    ) : (
                        <li><a href="/login" className="block py-2">Login</a></li>
                    )}
                </ul>
            </div>
        </div>
    );
}

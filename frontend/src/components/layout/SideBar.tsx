"use client";

import { useMovieStore } from "@/lib/store";
import Link from "next/link";

export function Sidebar() {
    const { isSidebarOpen, toggleSidebar } = useMovieStore();

    return (
        <div
            className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
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
                    <li><Link href="/movies/top-rated" className="block py-2">Top Rated</Link></li>
                    <li><Link href="/login" className="block py-2">Login</Link></li>
                </ul>
            </div>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { fetchProfile } from "@/lib/api";
import Link from "next/link";
import { useMovieStore } from "@/lib/stores/movieStore";
import { toast } from "react-toastify";
import { ContentType, WatchStatus } from "@/types/types";
import {useAuthStore} from "@/lib/store";

async function updateMovieStatus(userId: number, movieId: number, status: WatchStatus) {
    const { token } = useAuthStore.getState();
    if (!token) throw new Error("No token available");
    const res = await fetch("http://localhost:3000/profile/update-status", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId, status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to update status");
}

const getContentPath = (movie: any) => {
    switch (movie.type) {
        case ContentType.TV:
            return `/tv/${movie.id}`;
        case ContentType.ANIME:
            return `/anime/${movie.id}`; // Предполагаем отдельный роутинг для аниме
        case ContentType.MOVIE:
            return `/movie/${movie.id}`;
        default:
            return `/movie/${movie.id}`; // Для старых записей без type
    }
};

export default function ProfilePage() {
    const { isAuthenticated } = useAuthStore();
    const { setMovieIds } = useMovieStore();
    const [profile, setProfile] = useState<{ id: number; login: string; movieList: any[] } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProfile()
                .then((data) => {
                    setProfile(data);
                    setMovieIds(data.movieList.map((movie: any) => movie.id));
                })
                .catch((err) => setError(err.message));
        }
    }, [isAuthenticated, setMovieIds]);

    const handleStatusChange = async (movieId: number, newStatus: WatchStatus) => {
        if (!profile) return;
        try {
            await updateMovieStatus(profile.id, movieId, newStatus);
            setProfile({
                ...profile,
                movieList: profile.movieList.map((movie) =>
                    movie.id === movieId ? { ...movie, status: newStatus } : movie
                ),
            });
            toast.success("Status updated!");
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    if (!isAuthenticated) {
        return <div className="container mx-auto p-4">Please log in to view your profile.</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Profile</h1>
                <p className="text-red-700">{error}</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Profile</h1>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Profile</h1>
            <div className="mb-6">
                <p className="text-lg">ID: {profile.id}</p>
                <p className="text-lg">Login: {profile.login}</p>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your Movie List</h2>
            {profile.movieList.length === 0 ? (
                <p className="text-gray-600">No movies added yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {profile.movieList.map((movie, index) => {
                        return (
                            <div key={index} className="border p-4 rounded shadow hover:shadow-lg transition-shadow">
                                <Link href={getContentPath(movie)} className="block">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title || movie.name}
                                        className="w-full h-64 object-cover mb-2"
                                    />
                                    <h3 className="text-xl font-semibold">{movie.title || movie.name}</h3>
                                    <p className="text-gray-600 truncate">{movie.overview}</p>
                                    <p className="text-sm text-gray-500">Rating: {movie.vote_average}</p>
                                    <p className="text-sm text-gray-500">Type: {movie.type}</p>
                                </Link>
                                <div className="mt-2">
                                    <label htmlFor={`status-${movie.id}`} className="text-sm text-gray-700 mr-2">
                                        Status:
                                    </label>
                                    <select
                                        id={`status-${movie.id}`}
                                        value={movie.status || WatchStatus.WATCH_LATER}
                                        onChange={(e) => handleStatusChange(movie.id, e.target.value as WatchStatus)}
                                        className="p-1 border rounded text-gray-700"
                                    >
                                        <option value={WatchStatus.WATCHING}>Watching</option>
                                        <option value={WatchStatus.WATCH_LATER}>Watch Later</option>
                                        <option value={WatchStatus.WATCHED}>Watched</option>
                                    </select>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

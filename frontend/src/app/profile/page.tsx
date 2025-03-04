"use client";

import { useState, useEffect } from "react";
import { fetchProfile } from "@/lib/api";
import Link from "next/link";
import {useAuthStore} from "@/lib/store";

export default function ProfilePage() {
    const { isAuthenticated } = useAuthStore();
    const [profile, setProfile] = useState<{ id: number; login: string; movieList: any[] } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProfile()
                .then((data) => setProfile(data))
                .catch((err) => setError(err.message));
        }
        console.log(profile)
    }, [isAuthenticated]);

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
                    {profile.movieList.map((movie, index) => (
                        <Link href={`/movies/${movie.id}`} key={index} className="block">
                            <div className="border p-4 rounded shadow hover:shadow-lg transition-shadow">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-64 object-cover mb-2"
                                />
                                <h3 className="text-xl font-semibold">{movie.title}</h3>
                                <p className="text-gray-600 truncate">{movie.overview}</p>
                                <p className="text-sm text-gray-500">Rating: {movie.vote_average}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

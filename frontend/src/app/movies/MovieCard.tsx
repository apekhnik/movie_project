"use client";

import { Movie } from "@/types/types";
import { addMovieToProfile } from "@/lib/api";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

export function MovieCard({ movie }: { movie: Movie }) {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToProfile = async () => {
        setIsAdding(true);
        try {
            await addMovieToProfile(movie);
            toast.success("Movie added to profile!");
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "Failed to add movie");
        } finally {
            setIsAdding(false);
        }
    };

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "/placeholder.jpg";

    return (
        <div className="border p-4 rounded shadow">
            <Link href={`/movies/${movie.id}`} className="block">
                <img src={posterUrl} alt={movie.title} className="w-full h-64 object-cover mb-2" />
                <h2 className="text-xl font-semibold">{movie.title}</h2>
                <p className="text-gray-600 truncate">{movie.overview}</p>
                <p className="text-sm text-gray-500">Rating: {movie.vote_average}</p>
                <p className="text-sm text-gray-500">Release: {movie.release_date}</p>
            </Link>
            <button
                onClick={handleAddToProfile}
                disabled={isAdding}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
            >
                {isAdding ? "Adding..." : "Add to Profile"}
            </button>
        </div>
    );
}

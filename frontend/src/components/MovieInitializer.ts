"use client";

import { useEffect } from "react";
import { useMovieStore } from "@/lib/store"; // Предполагаю, что ты используешь moviesStore
import { Movie } from "@/types/types";

export function MovieInitializer({ initialMovies }: { initialMovies: Movie[] }) {
    const { movies, setMovies } = useMovieStore();

    useEffect(() => {
        if (movies.length === 0) setMovies(initialMovies);
    }, [initialMovies, movies, setMovies]);

    return null;
}

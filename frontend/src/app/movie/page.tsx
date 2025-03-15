"use client";

import { useState, useEffect } from "react";
import {ContentType, Movie} from "@/types/types";
import ReactPaginate from "react-paginate";
import {MovieCard} from "@/components/MovieCard";
import {fetchMoviesPages} from "@/lib/api";
import {useLanguageStore} from "@/lib/stores/languageStore";



export default function MoviesPage() {
    const { language } = useLanguageStore()
    const [movies, setMovies] = useState<Movie[]>([]);
    const [pageCount, setPageCount] = useState(10); // 100 фильмов / 10 = 10 страниц
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetchMoviesPages(currentPage + 1, language).then(setMovies).catch(console.error);
    }, [currentPage, language]);

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Top Movies</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        contentType={ContentType.MOVIE}
                    />
                ))}
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="Previous"
                containerClassName="flex gap-2 mt-8 justify-center"
                pageClassName="p-2 bg-blue-500 text-white rounded"
                activeClassName="bg-blue-700"
                previousClassName="p-2 bg-blue-500 text-white rounded"
                nextClassName="p-2 bg-blue-500 text-white rounded"
            />
        </div>
    );
}

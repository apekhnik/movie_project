"use client";

import { useState, useEffect } from "react";
import { ContentType, Movie } from "@/types/types";
import ReactPaginate from "react-paginate";
import { MovieCard } from "@/components/common/movie-card/MovieCard";
import {fetchAnimePages, fetchMoviesPages} from "@/lib/api";
import { useLanguageStore } from "@/lib/stores/languageStore";
import {StyledMoviesCards, StyledMoviesPageWrapper} from "@/app/styles";


export default function MoviesPage() {
    const { language } = useLanguageStore();
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
        <div className="min-h-screen text-white relative overflow-hidden">
            <StyledMoviesPageWrapper>
                <StyledMoviesCards>
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            contentType={ContentType.MOVIE}
                        />
                    ))}
                </StyledMoviesCards>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="Previous"
                    containerClassName="flex gap-2 mt-12 justify-center"
                    pageClassName="p-2 bg-blue-500 text-white rounded"
                    activeClassName="bg-blue-700"
                    previousClassName="p-2 bg-blue-500 text-white rounded"
                    nextClassName="p-2 bg-blue-500 text-white rounded"
                />
            </StyledMoviesPageWrapper>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { ContentType, Movie } from "@/types/types";
import ReactPaginate from "react-paginate";
import { MovieCard } from "@/components/common/movie-card/MovieCard";
import {fetchAnimePages, fetchTvShowsPages} from "@/lib/api";
import { useLanguageStore } from "@/lib/stores/languageStore";
import {StyledMoviesCards, StyledMoviesPageWrapper} from "@/app/styles";


export default function MoviesPage() {
    const { language } = useLanguageStore();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [pageCount, setPageCount] = useState(10); // 100 фильмов / 10 = 10 страниц
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetchTvShowsPages(currentPage + 1, language).then(setMovies).catch(console.error);
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
                            contentType={ContentType.TV}
                        />
                    ))}
                </StyledMoviesCards>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="→"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="←"
                    containerClassName="flex gap-2 mt-8 justify-center items-center"
                    pageClassName="w-8 h-8 flex items-center justify-center bg-[rgba(55,65,81,0.2)] border border-gray-300 rounded-full text-white hover:bg-[rgba(75,85,99,0.3)] transition-colors"
                    activeClassName="bg-[rgba(75,85,99,0.4)] border-gray-200"
                    previousClassName="w-8 h-8 flex items-center justify-center bg-[rgba(55,65,81,0.2)] border border-gray-300 rounded-full text-white hover:bg-[rgba(75,85,99,0.3)] transition-colors"
                    nextClassName="w-8 h-8 flex items-center justify-center bg-[rgba(55,65,81,0.2)] border border-gray-300 rounded-full text-white hover:bg-[rgba(75,85,99,0.3)] transition-colors"
                    pageLinkClassName="w-full h-full flex items-center justify-center" // Расширяем кликабельную область
                    activeLinkClassName="w-full h-full flex items-center justify-center" // Для активной страницы
                    previousLinkClassName="w-full h-full flex items-center justify-center" // Для стрелки влево
                    nextLinkClassName="w-full h-full flex items-center justify-center" // Для стрелки вправо
                    renderOnZeroPageCount={null}
                />
            </StyledMoviesPageWrapper>
        </div>
    );
}

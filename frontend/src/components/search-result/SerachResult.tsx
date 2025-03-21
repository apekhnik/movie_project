// components/SearchResult/SearchResult.tsx
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useMovieStore, useUiStore } from "@/lib/store";
import { ContentType, MovieContent } from "@/types/types";
import {
    SearchResultContainer,
    SearchResultItem,
    SearchResultImage,
    SearchResultInfo,
    SearchResultTitle,
    SearchResultText,
} from "./styles";

export function SearchResult() {
    const { searchResults } = useMovieStore();
    const { isSearchActive } = useUiStore();
    const containerRef = useRef<HTMLDivElement>(null); // Ref для анимации

    // Устанавливаем начальное положение при монтировании
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Устанавливаем начальное положение (выше экрана)
        // gsap.set(container, {
        //     y: "-200px", // Скрыт выше экрана
        // });

        // Анимация при первой загрузке в зависимости от isSearchActive
        if (isSearchActive) {
            gsap.to(container, {
                y: "500px", // Опускаем к центру
                duration: 0.5,
                ease: "power2.out",
            });
        }
    }, []); // Пустой массив зависимостей — выполняется только при монтировании

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        if (isSearchActive) {
            // Показываем блок (опускаем к центру, y: 0)
            gsap.to(container, {
                y: "500px", // Видимое положение (центр)
                duration: 0.5,
                ease: "power2.out",
            });
        } else {
            // Скрываем блок (поднимаем вверх, y: -100%)
            gsap.to(container, {
                y: "-500px", // Скрываем выше
                duration: 0.5,
                ease: "power2.in",
            });
        }
    }, [isSearchActive]);

    if (!searchResults || searchResults.length === 0) {
        return  <SearchResultContainer ref={containerRef}>
        </SearchResultContainer>
    }

    return (
        <SearchResultContainer ref={containerRef}>
            {searchResults.map((result: MovieContent) => {
                const posterUrl = result.poster_path
                    ? `https://image.tmdb.org/t/p/w200${result.poster_path}`
                    : "/placeholder.jpg";

                return (
                    <Link key={result.id} href={`/movie/${result.id}`}>
                        <SearchResultItem>
                            <SearchResultImage src={posterUrl} alt={result.title} />
                            <SearchResultInfo>
                                <SearchResultTitle>{result.title}</SearchResultTitle>
                                <SearchResultText>Rating: {result.vote_average || "N/A"}</SearchResultText>
                                <SearchResultText>Release: {result.release_date || "N/A"}</SearchResultText>
                            </SearchResultInfo>
                        </SearchResultItem>
                    </Link>
                );
            })}
        </SearchResultContainer>
    );
}

"use client";

import React, {useState, useEffect, useRef, useCallback, ChangeEvent} from "react";
import { styled } from "styled-components";
import gsap from "gsap";
import {useMovieStore, useUiStore} from "@/lib/store";
import {SearchInput} from "@/components/common/search/SearchComponents"; // Предполагаю, что это твой стор

// Стили для StyledSearchMovies
export const StyledSearchMovies = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: ${({ isActive }) => (isActive ? "20%" : "90%")};
  width: 400px;
    left: calc(50% - 400px);
`;

export function SearchMovies() {
    const { searchQuery, searchResults, setSearchQuery, setSearchResults } = useMovieStore();
    const { setIsLoading, setIsSearchActive, isSearchActive } = useUiStore();
    const searchMoviesRef = useRef<HTMLDivElement>(null); // Ref для анимируемого элемента

    // Функция для поиска фильмов
    const searchMovies = async () => {
        setIsSearchActive(true);
        setIsLoading(true);

        const res = await fetch(`http://localhost:3000/search?q=${searchQuery}`);
        const data = await res.json();
        setSearchResults(data);
        setIsLoading(false);
    };

    // Анимация с GSAP при изменении isSearchActive
    useEffect(() => {
        const element = searchMoviesRef.current;
        if (!element) return;

        // Анимация свойства top с помощью GSAP
        gsap.to(element, {
            top: isSearchActive ? "20%" : "80%", // Новое значение top
            duration: 0.5, // Длительность анимации в секундах
            ease: "power2.out", // Тип easing для плавности (можно настроить)
        });
    }, [isSearchActive]);

    return (
        <StyledSearchMovies ref={searchMoviesRef} isActive={isSearchActive}>
            <SearchInput
                value={searchQuery}
                onChange={((e) => setSearchQuery(e.target.value))}
                placeholder={"Search for a movie..."}
                onEnterPress={searchMovies}
            />
            {/* Добавим кнопку для теста переключения состояния */}
        </StyledSearchMovies>
    );
}

// components/SearchResult/SearchResult.tsx
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useMovieStore, useUiStore } from "@/lib/store";
import { ContentType, MovieContent } from "@/types/types";
import {
    SearchResultContainer,
    SearchResultItemWrapper,
    SearchResultImage,
    SearchResultInfo,
    SearchResultTitle,
    SearchResultText,
} from "./styles";
import {log} from "node:util";
import * as sea from "node:sea";
import {SearchResultItem} from "@/components/search-result/SearchResultItem";

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
            {searchResults.map((result: MovieContent) => <SearchResultItem result={result} />)}
        </SearchResultContainer>
    );
}

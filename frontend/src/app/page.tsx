"use client";

import { useState, useEffect } from "react";
import {TransitionDirection} from "@/types/types";
import styled from "styled-components";
import {StyledSearchBar} from "@/app/styles";
import {SearchMovies} from "@/components/SearchMovies";

export default function Home() {
    const backdrops = [
        "/images/1.png",
        "/images/2.png",
        "/images/3.png",
        "/images/4.png",
        "/images/5.png",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [direction, setDirection] = useState<"left" | "right">(TransitionDirection.RIGHT);
    const changeInterval = 5000;

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection("right");
            setIsTransitioning(true);
        }, changeInterval);

        return () => clearInterval(interval);
    }, [backdrops.length, changeInterval]);

    const handleTransitionEnd = () => {
        if (isTransitioning) {
            setCurrentIndex(nextIndex);
            setNextIndex((nextIndex + (direction === "right" ? 1 : -1 + backdrops.length)) % backdrops.length);
            setIsTransitioning(false);
        }
    };

    const handleNext = () => {
        if (!isTransitioning) {
            setDirection("right");
            setNextIndex((currentIndex + 1) % backdrops.length);
            setIsTransitioning(true);
        }
    };

    const handlePrev = () => {
        if (!isTransitioning) {
            setDirection("left");
            setNextIndex(currentIndex === 0 ? backdrops.length - 1 : currentIndex - 1);
            setIsTransitioning(true);
        }
    };

    return (
        <div className="min-h-screen text-white relative overflow-hidden flex justify-center align">
            {/* Текущий фон */}
            <div
                className={`absolute inset-0 ${
                    isTransitioning
                        ? direction === "right"
                            ? "animate-slide-out-right"
                            : "animate-slide-out-left"
                        : ""
                }`}
                style={{
                    backgroundImage: `url(${backdrops[currentIndex]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                onAnimationEnd={handleTransitionEnd}
            />
            {/* Следующий фон */}
            <div
                className={`absolute inset-0 ${
                    isTransitioning
                        ? direction === "right"
                            ? "animate-slide-in-right"
                            : "animate-slide-in-left"
                        : "opacity-0"
                }`}
                style={{
                    backgroundImage: `url(${backdrops[nextIndex]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            {/* Полупрозрачный слой */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <SearchMovies/>
        </div>
    );
}

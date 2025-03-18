"use client";

import { useState, useEffect } from "react";
import { TransitionDirection } from "@/types/types";
import { SearchMovies } from "@/components/SearchMovies";
import styled from "styled-components"; // Добавляем styled-components для стилизации

// Стилизованные компоненты
const SliderContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackgroundLayer = styled.div<{ active: boolean; direction?: string }>`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
  ${(props) =>
    props.active &&
    props.direction &&
    `
    transform: translateX(${props.direction === "right" ? "-100%" : "100%"});
  `}
  &.animate-slide-in-right {
    animation: slideInRight 0.5s forwards;
  }
  &.animate-slide-in-left {
    animation: slideInLeft 0.5s forwards;
  }
  &.animate-slide-out-right {
    animation: slideOutRight 0.5s forwards;
  }
  &.animate-slide-out-left {
    animation: slideOutLeft 0.5s forwards;
  }

  @keyframes slideInRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  @keyframes slideInLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  @keyframes slideOutRight {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
  }
  @keyframes slideOutLeft {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: black;
  opacity: 0.5;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 18px;
  z-index: 10;
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const PrevButton = styled(NavigationButton)`
  left: 20px;
`;

const NextButton = styled(NavigationButton)`
  right: 20px;
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
    display: flex;
    align-items: center;
`;

const Dot = styled.div<{ active: boolean }>`
    width: ${(props) => (props.active ? "15" : "10")}px;
    height: ${(props) => (props.active ? "15" : "10")}px;
  background-color: #ccc;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

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
        <SliderContainer>
            {/* Текущий фон */}
            <BackgroundLayer
                active={isTransitioning}
                direction={direction}
                style={{ backgroundImage: `url(${backdrops[currentIndex]})` }}
                className={
                    isTransitioning
                        ? direction === "right"
                            ? "animate-slide-out-right"
                            : "animate-slide-out-left"
                        : ""
                }
                onAnimationEnd={handleTransitionEnd}
            />
            {/* Следующий фон */}
            <BackgroundLayer
                active={isTransitioning}
                direction={direction === "right" ? "left" : "right"} // Обратное направление для входящего слайда
                style={{ backgroundImage: `url(${backdrops[nextIndex]})` }}
                className={
                    isTransitioning
                        ? direction === "right"
                            ? "animate-slide-in-right"
                            : "animate-slide-in-left"
                        : "opacity-0"
                }
            />
            {/* Полупрозрачный слой */}
            <Overlay />

            {/* Кнопка "Назад" */}
            <PrevButton onClick={handlePrev}>
                {/* Место для иконки PNG */}
                 <img src="images/icons/left-arrow.png" alt="Previous" />
            </PrevButton>

            {/* Кнопка "Вперёд" */}
            <NextButton onClick={handleNext}>
                {/* Место для иконки PNG */}
                 <img src="images/icons/right-arrow.png" alt="Next" />
            </NextButton>

            {/* Индикаторы (точки) */}
            <DotsContainer>
                {backdrops.map((_, index) => (
                    <Dot
                        key={index}
                        active={index === currentIndex}
                        onClick={() => {
                            if (!isTransitioning) {
                                setNextIndex(index);
                                setDirection(index > currentIndex ? "right" : "left");
                                setIsTransitioning(true);
                            }
                        }}
                    />
                ))}
            </DotsContainer>

            <SearchMovies />
        </SliderContainer>
    );
}

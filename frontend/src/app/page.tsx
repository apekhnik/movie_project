"use client";

import { useState, useEffect } from "react";
import { TransitionDirection } from "@/types/types";
import { SearchMovies } from "@/components/SearchMovies";
import styled from "styled-components";
import Slider from "@/shader-slider/Sliders";
import {useMovieStore} from "@/lib/store";
import {SearchResult} from "@/components/search-result/SearchResult"; // Добавляем styled-components для стилизации

// Стилизованные компоненты
const SliderContainer = styled.div`
  position: relative;
  height: 100vh;
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


    return (
        <SliderContainer>

            <Slider/>
            <Overlay />

            <SearchMovies />
            <SearchResult/>
        </SliderContainer>
    );
}

// src/components/SearchInput.tsx
"use client";

import styled from "styled-components";
import {useUiStore} from "@/lib/store";

// Стили для обёртки инпута
const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 800px;
    height: 60px;/* Ограничим ширину инпута */
`;

// Стили для инпута
const SearchInputStyled = styled.input`
  width: 100%;
  padding: 0.5rem 0.5rem 0.5rem 1rem; /* Отступ слева для лупы */
    background-color: rgb(245, 245, 245); /* Тёмный полупрозрачный фон (#374151 с прозрачностью) */
  border: none;
  border-radius: 1rem; /* Закруглённые края */
  color: #d1d5db; /* Светлый текст (#d1d5db - gray-300) */
  font-size: 1rem;

  &::placeholder {
    color: black; /* Светлый цвет плейсхолдера */
    opacity: 0.7;
  }

  &:focus {
    outline: none;
      background-color: rgb(200, 220, 255); /* Чуть ярче при фокусе */
  }
`;

// Стили для иконки лупы
const SearchIcon = styled.span`
  position: absolute;
  right: 1rem;
  color: #d1d5db; /* Светлый цвет лупы */
  font-size: 1.25rem;
    img {
        width: 20px;
        height: 20px;
    }
`;

export const StyledCloseBtn = styled.span`
    position: absolute;
    right: 3rem;
`

// Компонент инпута
interface SearchInputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onEnterPress: () => void;
    placeholder?: string;
}

export const SearchInput = ({ value, onChange, onEnterPress,placeholder}: SearchInputProps) => {
    const { setIsSearchActive, isSearchActive } = useUiStore();
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onEnterPress) {
            onEnterPress();
        }
    };
    return (
        <SearchWrapper>
            <SearchIcon>
                <img src="images/icons/search-icon.png" alt="Search Icon" onClick={onEnterPress}/>
            </SearchIcon>
            <StyledCloseBtn onClick={() => setIsSearchActive(false)}>X</StyledCloseBtn>
            <SearchInputStyled
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
            />
        </SearchWrapper>
    );
};

// src/components/SearchInput.tsx
"use client";

import styled from "styled-components";
import {useMovieStore, useUiStore} from "@/lib/store";

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
    background: var(--main_grey);
  border: none;
  border-radius: 1rem; /* Закруглённые края */
  color: var(--main_dark); /* Светлый текст (#d1d5db - gray-300) */
  font-size: 1rem;

  &::placeholder {
    color: var(--main_dark);
    opacity: 0.7;
  }

  &:focus {
    outline: none;
  }

    &:hover {
        outline: none;
        background: white;
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
    const {searchQuery} = useMovieStore();
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onEnterPress) {
            onEnterPress();
        }

        if(e.key === 'Backspace') {
            searchQuery.length === 1 && setIsSearchActive(false)
        }

        if(e.key === 'ArrowUp') {
            setIsSearchActive(true)
        }

        if(e.key === 'ArrowDown') {
            setIsSearchActive(false)
        }
    };
    return (
        <SearchWrapper>
            <SearchIcon>
                <img src="images/icons/search-icon.png" alt="Search Icon" onClick={onEnterPress}/>
            </SearchIcon>
            {isSearchActive && (
                <StyledCloseBtn onClick={() => setIsSearchActive(false)}>X</StyledCloseBtn>
            )}
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

// src/components/SearchInput.tsx
"use client";

import styled from "styled-components";

// Стили для обёртки инпута
const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px; /* Ограничим ширину инпута */
`;

// Стили для инпута
const SearchInputStyled = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem; /* Отступ слева для лупы */
  background: rgba(55, 65, 81, 0.5); /* Тёмный полупрозрачный фон (#374151 с прозрачностью) */
  border: none;
  border-radius: 1rem; /* Закруглённые края */
  color: #d1d5db; /* Светлый текст (#d1d5db - gray-300) */
  font-size: 1rem;

  &::placeholder {
    color: #d1d5db; /* Светлый цвет плейсхолдера */
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    background: rgba(55, 65, 81, 0.7); /* Чуть ярче при фокусе */
  }
`;

// Стили для иконки лупы
const SearchIcon = styled.span`
  position: absolute;
  left: 0.75rem;
  color: #d1d5db; /* Светлый цвет лупы */
  font-size: 1.25rem;
`;

// Компонент инпута
interface SearchInputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export const SearchInput = ({ value, onChange, placeholder = "Поиск треков, альбомов, исполнителей, подкаст" }: SearchInputProps) => {
    return (
        <SearchWrapper>
            <SearchIcon>🔍</SearchIcon>
            <SearchInputStyled
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </SearchWrapper>
    );
};

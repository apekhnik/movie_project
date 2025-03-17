import styled from "styled-components";
import { useState } from "react";
import {Languages, useLanguageStore} from "@/lib/stores/languageStore";

const CustomSelect = styled.div`
    position: relative;
    width: 60px;
`;

const SelectButton = styled.div`
  background: transparent; /* Убираем фон */
  color: white; /* Белый текст */
  padding: 0.375rem 1.5rem 0.375rem 0.5rem; /* Увеличен правый отступ */
  border-radius: 0.5rem; /* Скругление углов */
  cursor: pointer; /* Единственная интерактивность */
  text-align: center;
  position: relative;
`;

const OptionsList = styled.ul<{ open: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 60px;
  background: #1E293B; /* Тёмно-синий фон для опций */
  border-radius: 0.5rem;
  margin-top: 2px;
  list-style: none;
  padding: 0;
  display: ${(props) => (props.open ? "block" : "none")};
  z-index: 10;
`;

const Option = styled.li`
  padding: 0.375rem 0.5rem;
  color: white;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #2D3B50; /* Темнее при наведении на опции */
  }
`;

export default function LanguageSwitcher() {
    const {language, setLanguage} = useLanguageStore();
    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageChange = (value: Languages) => {
        setLanguage(value);
        setIsOpen(false);
    };

    return (
        <CustomSelect>
            <SelectButton onClick={() => setIsOpen(!isOpen)}>
                {language}
            </SelectButton>
            <OptionsList open={isOpen}>
                <Option onClick={() => handleLanguageChange(Languages.EN)}>EN</Option>
                <Option onClick={() => handleLanguageChange(Languages.RU)}>RU</Option>
            </OptionsList>
        </CustomSelect>
    );
}

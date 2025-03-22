import styled from "styled-components";
import {useState} from "react";
import {LanguagesClient, LanguagesServer, useLanguageStore} from "@/lib/stores/languageStore";

const CustomSelect = styled.div`
    position: relative;
`;

const SelectButton = styled.div`
  background: transparent; /* Убираем фон */
    transition: background 0.3s ease-in-out;
  color: white; /* Белый текст */
  border-radius: 0.5rem; /* Скругление углов */
    padding: 6px;
  cursor: pointer; /* Единственная интерактивность */
  text-align: center;
  position: relative;
    display: flex;
    justify-content: center;
    &:hover {
        background-color: var(--main_grey);
        color: var(--main_dark);/* Темнее при наведении на опции */
    }
    border: 1px solid var(--main_grey);
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

    const handleLanguageChange = (value: LanguagesServer) => {
        setLanguage(value);
        setIsOpen(false);
    };

    return (
        <CustomSelect>
            <SelectButton onClick={() => setIsOpen(!isOpen)}>
                {language === LanguagesServer.RU ? LanguagesClient.RU : LanguagesClient.EN}
            </SelectButton>
            <OptionsList open={isOpen}>
                <Option onClick={() => handleLanguageChange(LanguagesServer.EN)}>EN</Option>
                <Option onClick={() => handleLanguageChange(LanguagesServer.RU)}>RU</Option>
            </OptionsList>
        </CustomSelect>
    );
}

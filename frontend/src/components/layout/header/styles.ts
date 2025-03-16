import styled from "styled-components";

export const StyledHeader = styled.header`
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 16px;
    background-color: rgba(0, 0, 0, 0.3); /* Полупрозрачный фон */
    backdrop-filter: blur(8px); /* Размытие фона */
`;

export const AuthButton = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== "isLogout", // Исключаем isLogout из DOM
})<{ isLogout: boolean }>`
    background: ${(props) => (props.isLogout ? "#ef4444" : "#3b82f6")}; /* red-500 для Logout, blue-500 для Login */
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease-in-out;

    &:hover {
        background: ${(props) => (props.isLogout ? "#dc2626" : "#2563eb")}; /* red-600 для Logout, blue-600 для Login */
    }
`;

export const HeaderWrapper = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.a`
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  a {
    color: white;
    text-decoration: none;
    &:hover {
      color: #d1d5db;
    }
  }
`;

export const LanguageSelect = styled.select`
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;

  option {
    background-color: #1f2937;
    color: white;
  }
`;

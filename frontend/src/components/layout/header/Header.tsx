"use client";

import Link from "next/link";
import { useLanguageStore } from "@/lib/stores/languageStore";
import styled from "styled-components";
import {useAuthStore} from "@/lib/store";

// Стили
const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #1f2937;
  color: white;
  z-index: 20;
  display: flex;
  align-items: center;
  padding: 0 1rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LanguageSelect = styled.select`
  background: #374151; /* gray-700 */
  color: white;
  padding: 0.25rem;
  border-radius: 0.375rem;
  border: none;
`;

// Обновлённые стили для кнопки Login/Logout
const AuthButton = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== "isLogout",
})<{ isLogout: boolean }>`
  background: ${(props) => (props.isLogout ? "#4b5563" : "#4b5563")}; /* gray-600 для обоих состояний */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: ${(props) => (props.isLogout ? "#6b7280" : "#6b7280")}; /* gray-500 при наведении */
  }
`;

export default function Header() {
    const { language, setLanguage } = useLanguageStore();
    const { isAuthenticated, logout } = useAuthStore();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = event.target.value;
        setLanguage(newLanguage);
    };

    const handleAuthAction = () => {
        if (isAuthenticated) {
            logout();
        }
    };

    return (
        <HeaderWrapper>
            <Nav>
                <Link href="/" passHref legacyBehavior>
                    <Logo>Movie App</Logo>
                </Link>
                <NavLinks>
                    <Link href="/movie" passHref legacyBehavior>
                        <a>Movies</a>
                    </Link>
                    <Link href="/anime" passHref legacyBehavior>
                        <a>Anime</a>
                    </Link>
                    <Link href="/tv" passHref legacyBehavior>
                        <a>Series</a>
                    </Link>
                    <Link href="/profile" passHref legacyBehavior>
                        <a>Profile</a>
                    </Link>
                    <LanguageSelect value={language} onChange={handleLanguageChange}>
                        <option value="en">English</option>
                        <option value="ru">Русский</option>
                    </LanguageSelect>
                    {isAuthenticated ? (
                        <AuthButton isLogout={true} onClick={handleAuthAction}>
                            Logout
                        </AuthButton>
                    ) : (
                        <Link href="/login" passHref legacyBehavior>
                            <AuthButton isLogout={false}>Login</AuthButton>
                        </Link>
                    )}
                </NavLinks>
            </Nav>
        </HeaderWrapper>
    );
}

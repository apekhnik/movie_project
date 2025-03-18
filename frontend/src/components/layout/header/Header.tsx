"use client";

import Link from "next/link";
import { useLanguageStore } from "@/lib/stores/languageStore";
import styled from "styled-components";
import {useAuthStore, useUiStore} from "@/lib/store";
import LanguageSwitcher from "@/components/common/lang-switcher/LanguageSwitcher";
import {useEffect, useState} from "react";
import {fetchProfile} from "@/lib/api";
import {toast} from "react-toastify";

// Стили
const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
    background: #121137;
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
  gap: 4rem;
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
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 100px;
  border: 1px solid white;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: ${(props) => (props.isLogout ? "#6b7280" : "#6b7280")}; /* gray-500 при наведении */
  }
`;

export default function Header() {
    const { isAuthenticated, logout } = useAuthStore();
    const {isLoading, setIsLoading} = useUiStore();
    const [profile, setProfile] = useState<{ id: number; login: string; username: string; movieList: any[] } | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            setIsLoading(true);

            fetchProfile()
                .then((data) => {
                    setProfile(data);
                })
                .catch((err) => toast.error(err));

            setIsLoading(false);
        }
    }, [isAuthenticated]);

    const handleAuthAction = () => {
        if (isAuthenticated) {
            logout();
        }
    };

    return (
        <HeaderWrapper>
            <Nav>
                <NavLinks>
                    <Link href="/" passHref legacyBehavior>
                        <Logo>Movie App</Logo>
                    </Link>
                    <Link href="/movie" passHref legacyBehavior>
                        <a>Movies</a>
                    </Link>
                    <Link href="/anime" passHref legacyBehavior>
                        <a>Anime</a>
                    </Link>
                    <Link href="/tv" passHref legacyBehavior>
                        <a>Series</a>
                    </Link>
                </NavLinks>
                <NavLinks>
                    <LanguageSwitcher/>

                    {isAuthenticated && profile ? (
                            <Link href="/profile" passHref legacyBehavior>
                                <a>{profile.username}</a>
                            </Link>
                    ) : null}

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

"use client";

import Link from "next/link";
import styled from "styled-components";
import {useAuthStore, useUiStore} from "@/lib/store";
import LanguageSwitcher from "@/components/common/lang-switcher/LanguageSwitcher";
import {useEffect, useState} from "react";
import {fetchProfile} from "@/lib/api";
import {toast} from "react-toastify";

// Стили
export const StyledLink = styled(Link)`
    &:hover {
        color: red
    }
`;

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
    background: var(--main_dark);
    color: var(--main_grey);
  z-index: 20;
  display: flex;
  align-items: center;
  padding: 0 1rem;
    font-family: var(--font-geist-mono);
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
    color: var(--main_grey);

    a {
        &:hover {
            color: white;
        }
    }
   
`;

const AuthButton = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== "isLogout",
})<{ isLogout: boolean }>`
  color: var(--main_grey);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--main_grey);
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
      color: var(--main_dark);
      background: var(--main_grey);
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
                    <StyledLink href="/" passHref legacyBehavior>
                        <Logo>Movie App</Logo>
                    </StyledLink>
                    <StyledLink href="/movie" passHref legacyBehavior>
                        <a>Movies</a>
                    </StyledLink>
                    <StyledLink href="/anime" passHref legacyBehavior>
                        <a>Anime</a>
                    </StyledLink>
                    <StyledLink href="/tv" passHref legacyBehavior>
                        <a>Series</a>
                    </StyledLink>
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

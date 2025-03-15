"use client";

import styled from "styled-components";
import Link from "next/link";
import {useLanguageStore} from "@/lib/stores/languageStore";

const HeaderWrapper = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  padding: 16px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.a`
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
`;

const NavLinks = styled.div`
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

const LanguageSelect = styled.select`
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

export default function Header() {
    const { language, setLanguage } = useLanguageStore();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = event.target.value;
        setLanguage(newLanguage);
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
                </NavLinks>
            </Nav>
        </HeaderWrapper>
    );
}

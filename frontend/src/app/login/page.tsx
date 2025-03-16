"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/store";
import { handleLogin } from "@/lib/api";
import styled from "styled-components";
import Link from "next/link";
import {toast} from "react-toastify";

export default function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const { login: authLogin, logout, isAuthenticated, token } = useAuthStore();

    const onLogin = async () => {
        try {
            await handleLogin(login, password);
            toast.success("Login successfull");
            setLogin("");
            setPassword("");
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : "An unknown error occurred");
        }
    };

    const handleLogout = () => {
        logout();
        toast.success("Logout successfull");
    };

    const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #4b5e8d;
    padding: 2rem;
  `;

    const ContentWrapper = styled.div`
    display: flex;
    width: 100%;
    max-width: 900px;
    background: #2d3748;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  `;

    const LeftPanel = styled.div`
    flex: 1;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: white;
  `;

    const RightPanel = styled.div`
    flex: 1;
    min-height: 500px;
    background: #4a3c7a;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;
    color: white;
  `;

    const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 1rem;
  `;

    const SubText = styled.p`
    font-size: 0.9rem;
    color: #a0aec0;
    margin-bottom: 1rem;
  `;

    const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    background: #4a5568;
    border: none;
    border-radius: 0.5rem;
    color: white;
    font-size: 1rem;

    &::placeholder {
      color: #a0aec0;
      opacity: 0.7;
    }

    &:focus {
      outline: none;
      background: #4a5568;
    }
  `;

    const Button = styled.button`
    width: 100%;
    padding: 0.75rem;
    background: #6b46c1;
    border: none;
    border-radius: 0.5rem;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #5a36a4;
    }
  `;

    return (
        <Container>
            <ContentWrapper>
                <LeftPanel>
                    <Title>Login</Title>
                    <SubText>
                        Don’t have an account? <Link href="/registration" style={{ color: "#a0aec0" }}>Create an account</Link>
                    </SubText>
                    {isAuthenticated ? (
                        <div>
                            <p className="mb-2">You are logged in! Token: {token}</p>
                            <Button onClick={handleLogout}>Logout</Button>
                        </div>
                    ) : (
                        <div>
                            <Input
                                type="text"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                placeholder="Login"
                            />
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                            <Button onClick={onLogin}>Login</Button>
                        </div>
                    )}
                </LeftPanel>
                <RightPanel>
                    <div />
                    <div />
                </RightPanel>
            </ContentWrapper>
        </Container>
    );
}

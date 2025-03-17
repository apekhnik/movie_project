"use client";

import { useState } from "react";
import { useAuthStore } from "@/lib/store";
import { handleLogin } from "@/lib/api";
import styled from "styled-components";
import Link from "next/link";
import {toast} from "react-toastify";
import {Button, Container, ContentWrapper, Input, LoginLeftPanel, LoginRightPanel, SubText, Title} from "@/app/styles";

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

    return (
        <Container>
            <ContentWrapper>
                <LoginLeftPanel>
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
                </LoginLeftPanel>
                <LoginRightPanel>
                    <div />
                    <div />
                </LoginRightPanel>
            </ContentWrapper>
        </Container>
    );
}

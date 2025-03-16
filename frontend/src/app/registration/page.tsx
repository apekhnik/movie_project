"use client";

import Link from "next/link";
import {handleRegistration} from "@/lib/api";
import {useState} from "react";
import {toast} from "react-toastify";
import { useRouter } from "next/navigation";
import {BackLink, Button, Checkbox, CheckboxLabel, CheckboxWrapper, Container, ContentWrapper, Input, LeftPanel, Logo, RightPanel, Slogan, SocialButton, SocialLogin, SubText, Title} from "@/app/styles";

export default function RegistrationPage() {
    const router = useRouter();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");


    const onRegister = async () => {
        try {
            await handleRegistration(login, password, username);
            setLogin("");
            setPassword("");
            setUsername("");
            toast.success("Registered and logged in!");
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : "An unknown error occurred");
        }finally {
            router.push("/")
        }
    };

    return (
        <Container>
            <ContentWrapper>
                <LeftPanel>
                    <Logo>Logo</Logo>
                    <Slogan>...</Slogan>
                </LeftPanel>
                <RightPanel>
                    <BackLink href="/">Back to website →</BackLink>
                    <Title>Create an account</Title>
                    <SubText>Already have an account? <Link href="/login" style={{ color: "#a0aec0" }}>Log in</Link></SubText>
                    <Input type="text" placeholder="User name" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Input type="email" placeholder="Login"  value={login} onChange={(e) => setLogin(e.target.value)} />
                    <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <CheckboxWrapper>
                        <Checkbox type="checkbox" id="terms" />
                        <CheckboxLabel htmlFor="terms">I agree to the Terms & Conditions</CheckboxLabel>
                    </CheckboxWrapper>
                    <Button onClick={onRegister}>Create account</Button>
                    <SocialLogin>
                        <SocialButton>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
                            Google
                        </SocialButton>
                        <SocialButton>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
                            Apple
                        </SocialButton>
                    </SocialLogin>
                </RightPanel>
            </ContentWrapper>
        </Container>
    );
}

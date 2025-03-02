"use client";

import { useAuthStore } from "@/lib/store";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const verifyToken = useAuthStore((state) => state.verifyToken);

    useEffect(() => {
        verifyToken();
    }, [verifyToken]);

    return <>{children}</>;
}

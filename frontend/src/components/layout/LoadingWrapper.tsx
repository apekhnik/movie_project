"use client";

import {useUiStore} from "@/lib/store";

export function LoadingWrapper({ children }: { children: React.ReactNode }) {
    const { isLoading } = useUiStore();

    return isLoading ? (
        <div className="flex-1 flex items-center justify-center">
            <p className="text-xl">Loading...</p>
        </div>
    ) : (
        <main className="p-4 flex-1">{children}</main>
    );
}

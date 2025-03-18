"use client"

import {useUiStore} from "@/lib/store";

export function LoadingWrapper({ children }: { children: React.ReactNode }) {
    const isLoading = useUiStore.getState().isLoading

    console.log(isLoading, 'wrapper');
    return isLoading ? (
        <div className="flex-1 flex items-center justify-center bg-amber-700">
            LOADING
        </div>
    ) : (
        <main className="flex-1">{children}</main>
    );
}

import {Movie} from "@/types/types";
import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

interface MovieState {
    movies: Movie[];
    searchQuery: string;
    searchResults: Movie[];
    setMovies: (movies: Movie[]) => void;
    setSearchQuery: (query: string) => void;
    setSearchResults: (results: Movie[]) => void;
}

interface UiState {
    isLoading: boolean;
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    setIsLoading: (isLoading: boolean) => void;
}

interface AuthState {
    token: string | null;
    userId: number | null;
    username: string | null;
    isAuthenticated: boolean;
    login: (token: string, userId: number, username: string) => void;
    logout: () => void;
    verifyToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            userId: null,
            isAuthenticated: false,
            username: null,
            login: (token, userId, username) => set({
                token,
                userId,
                isAuthenticated: true,
                username,
            }),
            logout: () => set({ token: null, userId: null, isAuthenticated: false, username: null }),
            verifyToken: async () => {
                const { token } = get();
                if (!token) {
                    set({ token: null, userId: null, isAuthenticated: false });
                    return;
                }
                try {
                    const res = await fetch("http://localhost:3000/auth/verify", {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });
                    if (!res.ok) throw new Error("Invalid token");
                    const data = await res.json();
                    set({ userId: data.user.id, isAuthenticated: true });
                } catch (error) {
                    console.error("Token verification failed:", error);
                    set({ token: null, userId: null, isAuthenticated: false });
                }
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export const useUiStore = create<UiState>((set) => ({
    isLoading: true,
    isSidebarOpen: true,
    setIsLoading: (isLoading: boolean) => {
        set((state) => {
            console.log("in the store", isLoading);
            return { ...state, isLoading };
        });
    },
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

export const useMovieStore = create<MovieState>((set) => ({
    movies: [],
    searchQuery: "",
    searchResults: [],
    setMovies: (movies) => set({ movies }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSearchResults: (results) => set({ searchResults: results }),
}));

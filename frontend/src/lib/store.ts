import {Movie} from "@/types/types";
import {create} from "zustand";

interface MovieState {
    isLoading: boolean;
    isSidebarOpen: boolean;

    movies: Movie[];
    searchQuery: string;
    searchResults: Movie[];
    setMovies: (movies: Movie[]) => void;
    setSearchQuery: (query: string) => void;
    setSearchResults: (results: Movie[]) => void;
    toggleSidebar: () => void;
}

export const useMovieStore = create<MovieState>((set) => ({
    isLoading: false,
    isSidebarOpen: true,

    movies: [],
    searchQuery: "",
    searchResults: [],
    setMovies: (movies) => set({ movies }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSearchResults: (results) => set({ searchResults: results }),
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

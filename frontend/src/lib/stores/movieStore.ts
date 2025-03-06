import { create } from "zustand";

interface MovieStore {
    movieIds: number[];

    setMovieIds: (ids: number[]) => void;
    addMovieId: (id: number) => void;
    removeMovieId: (id: number) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
    movieIds: [],

    setMovieIds: (ids) => set({ movieIds: ids }),
    addMovieId: (id) => set((state) => ({ movieIds: [...state.movieIds, id] })),
    removeMovieId: (id) => set((state) => ({ movieIds: state.movieIds.filter((movieId) => movieId !== id) })),
}));

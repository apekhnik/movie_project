import { create } from "zustand";

interface LanguageState {
    language: string; // Например, "en" или "ru"
    setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
    language: "ru",
    setLanguage: (lang) => set({ language: lang }),
}));

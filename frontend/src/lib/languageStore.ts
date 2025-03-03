import { create } from "zustand";

interface LanguageState {
    language: string; // Например, "en" или "ru"
    setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
    language: "en", // По умолчанию английский
    setLanguage: (lang) => set({ language: lang }),
}));

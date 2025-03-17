import { create } from "zustand";

export enum Languages {
    RU = "RU",
    EN = "EN"
}

interface LanguageState {
    language: Languages; // Например, "en" или "ru"
    setLanguage: (lang: Languages) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
    language: Languages.EN,
    setLanguage: (lang:Languages) => set({ language: lang }),
}));

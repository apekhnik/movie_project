import { create } from "zustand";

export enum LanguagesServer {
    RU = "ru",
    EN = "en"
}

export enum LanguagesClient {
    RU = "RU",
    EN = "EN"
}

interface LanguageState {
    language: LanguagesServer; // Например, "en" или "ru"
    setLanguage: (lang: LanguagesServer) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
    language: LanguagesServer.EN,
    setLanguage: (lang:LanguagesServer) => set({ language: lang }),
}));

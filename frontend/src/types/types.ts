export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    vote_average: number;
    release_date: string;
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    popularity: number;
    video: boolean;
    vote_count: number;
}

export interface TVShow {
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    original_language: string;
    number_of_seasons: number;
    number_of_episodes: number;
}

// Общий тип для Movie или TVShow
export type ContentItem = Movie | TVShow;

// Дискриминированный union для определения типа
interface BaseContent {
    id: number;
    overview: string;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
    popularity: number;
    original_language: string;
}

export interface MovieContent extends BaseContent {
    title: string;
    release_date: string;
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    original_title: string;
    video: boolean;
}

export interface TVShowContent extends BaseContent {
    name: string;
    first_air_date: string;
    number_of_seasons: number;
    number_of_episodes: number;
}

export enum ContentType {
    ANIME = "anime",
    MOVIE = "movie",
    TV = "tv",
}

export enum WatchStatus {
    WATCHING = "watching",      // Смотрю сейчас
    WATCH_LATER = "watch_later", // Посмотреть позже
    WATCHED = "watched",        // Просмотрено
}

export enum TransitionDirection {
    LEFT = "left",
    RIGHT = "right",
}

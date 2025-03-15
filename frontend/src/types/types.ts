export interface Movie {
    id: number;
    title: string;        // TMDb использует "title" вместо "name"
    overview: string;     // "overview" вместо "description"
    poster_path: string;  // Путь к постеру
    vote_average: number; // Средний рейтинг
    release_date: string; // Дата релиза
    adult: boolean;
    backdrop_path: string | null; // Может быть null в некоторых случаях
    genre_ids: number[]; // Массив чисел
    original_language: string;
    original_title: string;
    popularity: number;
    video: boolean;
    vote_count: number;
}

export interface TVShow {
    id: number;
    name: string; // Используем name вместо title
    overview: string;
    poster_path: string | null;
    first_air_date: string; // Используем first_air_date вместо release_date
    vote_average: number;
    vote_count: number;
    popularity: number;
    original_language: string;
    number_of_seasons: number; // Количество сезонов
    number_of_episodes: number; // Количество эпизодов
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

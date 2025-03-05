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

export enum WatchStatus {
    WATCHING = "watching",      // Смотрю сейчас
    WATCH_LATER = "watch_later", // Посмотреть позже
    WATCHED = "watched",        // Просмотрено
}

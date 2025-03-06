export interface ITmdbMovie {
    adult: boolean;
    backdrop_path: string | null; // Может быть null в некоторых случаях
    genre_ids: number[]; // Массив чисел
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null; // Может быть null
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface ITmdbResponse {
    results: ITmdbMovie[];
    page: number;
    total_pages: number;
    total_results: number;
}

export enum MovieKeyword {
    Anime = 210024,
    Superhero = 9715,
    Zombie = 12377,
    Space = 3359,
    TimeTravel = 9663,
    MartialArts = 1463,
    Vampire = 3133,
    PostApocalyptic = 11014,
}

export enum MovieGenre {
    Action = 28,
    Adventure = 12,
    Animation = 16,
    Comedy = 35,
    Crime = 80,
    Documentary = 99,
    Drama = 18,
    Family = 10751,
    Fantasy = 14,
    History = 36,
    Horror = 27,
    Music = 10402,
    Mystery = 9648,
    Romance = 10749,
    ScienceFiction = 878,
    TVMovie = 10770,
    Thriller = 53,
    War = 10752,
    Western = 37,
}

export enum TvGenre {
    ActionAndAdventure = 10759,
    Animation = 16,         // Совпадает с фильмами
    Comedy = 35,            // Совпадает с фильмами
    Crime = 80,             // Совпадает с фильмами
    Documentary = 99,       // Совпадает с фильмами
    Drama = 18,             // Совпадает с фильмами
    Family = 10751,         // Совпадает с фильмами
    Kids = 10762,
    Mystery = 9648,         // Совпадает с фильмами
    News = 10763,
    Reality = 10764,
    SciFiAndFantasy = 10765,
    Soap = 10766,
    Talk = 10767,
    WarAndPolitics = 10768,
    Western = 37,           // Совпадает с фильмами
}

export enum WatchStatus {
    WATCHING = "watching",      // Смотрю сейчас
    WATCH_LATER = "watch_later", // Посмотреть позже
    WATCHED = "watched",        // Просмотрено
}

interface ITmdbSeries {
    adult: boolean;
    backdrop_path: string | null;
    created_by: { id: number; name: string; profile_path: string | null }[];
    episode_run_time: number[];
    first_air_date: string;
    genres: { id: number; name: string }[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: {
        air_date: string;
        episode_number: number;
        id: number;
        name: string;
        overview: string;
        season_number: number;
    };
    name: string;
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    seasons: {
        air_date: string;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string | null;
        season_number: number;
    }[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}

export enum ContentType {
    ANIME = "anime",      // Аниме
    MOVIE = "movie",      // Фильмы
    SERIES = "tv",    // Сериалы
}

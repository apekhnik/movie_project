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

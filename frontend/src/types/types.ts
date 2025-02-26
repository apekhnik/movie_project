export interface Movie {
    id: number;
    title: string;        // TMDb использует "title" вместо "name"
    overview: string;     // "overview" вместо "description"
    poster_path: string;  // Путь к постеру
    vote_average: number; // Средний рейтинг
    release_date: string; // Дата релиза
}

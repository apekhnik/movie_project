import { Movie } from "@/types/types";
import {fetchMovie} from "@/lib/api";

// Тип для параметров страницы
type MoviePageParams = {
    params: Promise<{ id: string }>; // params как Promise
};

export default async function MovieDetailPage({ params }: MoviePageParams) {
    const { id } = await params; // Разворачиваем Promise
    const movie = await fetchMovie(id);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full md:w-1/3 h-auto rounded"
                />
                <div className="flex-1">
                    <p className="text-gray-600 mb-4">{movie.overview}</p>
                    <p className="text-sm text-gray-500">Release Date: {movie.release_date}</p>
                    <p className="text-sm text-gray-500">Rating: {movie.vote_average}</p>
                    <p className="text-sm text-gray-500">Original Language: {movie.original_language}</p>
                    <p className="text-sm text-gray-500">Popularity: {movie.popularity}</p>
                    <p className="text-sm text-gray-500">Vote Count: {movie.vote_count}</p>
                </div>
            </div>
        </div>
    );
}

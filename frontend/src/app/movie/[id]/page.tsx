import {ContentType, Movie} from "@/types/types";
import { fetchMovie } from "@/lib/api";
import AddToProfileButton from "@/components/common/AddToProfileButton"; // Убедись, что fetchMovie экспортируется корректно

// Тип для параметров серверного компонента
type MoviePageParams = {
    params: Promise<{ id: string }>;
};

export default async function MovieDetailPage({ params }: MoviePageParams) {
    const { id } = await params; // Разворачиваем Promise на сервере
    let movie: Movie;

    try {
        movie = await fetchMovie(id); // Загружаем фильм на сервере
    } catch (error: any) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Movie Details</h1>
                <p className="text-red-600">Failed to load movie: {error.message}</p>
            </div>
        );
    }

    return (
        <div
            className="border p-4 rounded shadow hover:shadow-lg transition-shadow relative"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w780${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="container mx-auto p-4 relative z-10">
                <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                <div className="flex flex-col md:flex-row gap-6">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full md:w-1/3 h-auto rounded"
                    />
                <div className="flex-1">
                    <p className="text-white-600 mb-4">{movie.overview}</p>
                    <p className="text-sm text-white-500">Release Date: {movie.release_date}</p>
                    <p className="text-sm text-white-500">Rating: {movie.vote_average}</p>
                    <p className="text-sm text-white-500">Original Language: {movie.original_language}</p>
                    <p className="text-sm text-white-500">Popularity: {movie.popularity}</p>
                    <p className="text-sm text-white-500">Vote Count: {movie.vote_count}</p>
                </div>
             </div>
            </div>
            <AddToProfileButton id={movie.id} type={ContentType.MOVIE}/>
        </div>
    );
}

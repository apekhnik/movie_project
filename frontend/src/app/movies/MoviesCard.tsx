import {Movie} from "@/types/types";

export function MovieCard({ movie }: { movie: Movie }) {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "/placeholder.jpg"; // Замена, если постера нет

    return (
        <div className="border p-4 rounded shadow">
            <img src={posterUrl} alt={movie.title} className="w-full h-64 object-cover mb-2" />
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p className="text-gray-600">{movie.overview}</p>
            <p className="text-sm text-gray-500">Rating: {movie.vote_average}</p>
            <p className="text-sm text-gray-500">Release: {movie.release_date}</p>
        </div>
    );
}

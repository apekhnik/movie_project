import { fetchTopMovies } from "@/lib/api";
import { Movie } from "@/types/types";
import Link from "next/link";

export default async function MoviesPage() {
    let topMovies: Movie[] = [];
    try {
        topMovies = await fetchTopMovies();
    } catch (error) {
        console.error("Error fetching top movies:", error);
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Top 10 Movies</h1>
                <p className="text-red-600">Failed to load movies. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Top 10 Movies</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topMovies.map((movie) => (
                    <Link href={`/movies/${movie.id}`} key={movie.id} className="block">
                        <div className="border p-4 rounded shadow hover:shadow-lg transition-shadow">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-64 object-cover mb-2"
                            />
                            <h2 className="text-xl font-semibold">{movie.title}</h2>
                            <p className="text-gray-600 truncate">{movie.overview}</p>
                            <p className="text-sm text-gray-500">Rating: {movie.vote_average}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

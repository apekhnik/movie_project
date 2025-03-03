import { Movie } from "@/types/types";
import {MovieCard} from "@/app/movies/MovieCard";
import {fetchTopAnime} from "@/lib/api";


export default async function TopAnimePage() {
    let topAnime: Movie[] = [];
    try {
        topAnime = await fetchTopAnime();
    } catch (error) {
        //TODO
        console.error("Error fetching top anime:", error);
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Top 10 Anime</h1>
                <p className="text-red-600">Failed to load anime. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Top 10 Anime</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topAnime.map((anime) => (
                    <MovieCard key={anime.id} movie={anime} />
                ))}
            </div>
        </div>
    );
}

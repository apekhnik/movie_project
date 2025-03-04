import { Movie } from "@/types/types";
import Link from "next/link";
import {fetchAnime} from "@/lib/api";

export default async function TopAnimePage() {
    let topAnime: Movie[] = [];
    try {
        topAnime = await fetchAnime();
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
                    <Link href={`/anime/${anime.id}`} className="block" key={anime.id}>
                      <div  className="border p-4 rounded shadow">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${anime.poster_path}`}
                            alt={anime.title}
                            className="w-full h-64 object-cover mb-2"
                        />
                        <h2 className="text-xl font-semibold">{anime.title}</h2>
                        <p className="text-gray-600 truncate">{anime.overview}</p>
                        <p className="text-sm text-gray-500">Rating: {anime.vote_average}</p>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

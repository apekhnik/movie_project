import { Movie } from "@/types/types"; // Переименуем Movie в TvShow, если нужно

async function fetchTopTvShows(): Promise<Movie[]> {
    const res = await fetch("http://backend:3000/tv", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch top TV shows");
    return res.json();
}

export default async function TopRatedTvShowsPage() {
    let topShows: Movie[] = [];
    try {
        topShows = await fetchTopTvShows();
    } catch (error) {
        //TODO
        console.error("Error fetching top TV shows:", error);
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Top 10 TV Shows</h1>
                <p className="text-red-600">Failed to load TV shows. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Top 10 TV Shows</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topShows.map((show) => (
                    <div key={show.id} className="border p-4 rounded shadow">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                            alt={show.title}
                            className="w-full h-64 object-cover mb-2"
                        />
                        <h2 className="text-xl font-semibold">{show.title}</h2>
                        <p className="text-gray-600 truncate">{show.overview}</p>
                        <p className="text-sm text-gray-500">Rating: {show.vote_average}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

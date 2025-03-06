import {ContentType, Movie} from "@/types/types";
import {fetchTvShows} from "@/lib/api";
import {MovieCard} from "@/components/MovieCard";


export default async function TopRatedTvShowsPage() {
    let topShows: Movie[] = [];
    try {
        topShows = await fetchTvShows();
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
                    <MovieCard key={show.id} movie={show} contentType={ContentType.TV}/>
                ))}
            </div>
        </div>
    );
}

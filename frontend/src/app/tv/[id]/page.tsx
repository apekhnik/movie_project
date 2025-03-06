import {fetchTvShowById} from "@/lib/api";
import {ContentType, Movie} from "@/types/types";
import AddToProfileButton from "@/components/common/AddToProfileButton";

type TvShowPageParams = {
    params: Promise<{ id: string }>;
};

export default async function TvShowDetailPage({ params }: TvShowPageParams) {
    const { id } = await params;
    let movie: Movie;

    try {
        movie = await fetchTvShowById(id);
    } catch (error: any) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Movie Details</h1>
                <p className="text-red-600">Failed to load movie: {error.message}</p>
            </div>
        );
    }

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
            <AddToProfileButton id={movie.id} type={ContentType.TV}/>
        </div>
    );
}

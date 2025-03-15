"use client";

import {ContentType, Movie} from "@/types/types";
import {useMovieStore} from "@/lib/store";
import {MovieCard} from "@/components/common/movie-card/MovieCard";

export function SearchMovies() {
    const { searchQuery, searchResults, setSearchQuery, setSearchResults } = useMovieStore();

    const searchMovies = async () => {
        const res = await fetch(`http://localhost:3000/search?q=${searchQuery}`);
        const data = await res.json();
        setSearchResults(data);
    };

    return (
        <div>
            <div className='mb-8'>
                <h2 className="text-2xl mb-2">Search Movies</h2>
                <button onClick={searchMovies} className="bg-blue-500 text-white p-2 mb-4">
                    Search
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.length > 0 ? (
                        searchResults.map((movie: Movie) => (
                            <MovieCard key={movie.id} movie={movie} contentType={ContentType.MOVIE}/>
                        ))
                    ) : (
                        <p>No search results yet.</p>
                    )}
                </div>
            </div>
            <div className="mb-8">
                <h2 className="text-2xl mb-2">Filter Top Movies</h2>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter top movies..."
                    className="border p-2 mb-4 w-full"
                />
            </div>
        </div>
    );
}

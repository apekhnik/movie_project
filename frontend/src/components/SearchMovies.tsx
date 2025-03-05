"use client";

import {Movie} from "@/types/types";
import {useMovieStore} from "@/lib/store";
import {MovieCard} from "@/components/MovieCard";

export function SearchMovies() {
    const { movies, searchQuery, searchResults, setSearchQuery, setSearchResults } = useMovieStore();

    const filteredMovies = movies.filter((movie: Movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                            <MovieCard key={movie.id} movie={movie} />
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
                {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">*/}
                {/*    {filteredMovies.length > 0 ? (*/}
                {/*        filteredMovies.map((movie) => (*/}
                {/*            <MovieCard key={movie.id} movie={movie} />*/}
                {/*        ))*/}
                {/*    ) : (*/}
                {/*        <p>No movies match your filter.</p>*/}
                {/*    )}*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

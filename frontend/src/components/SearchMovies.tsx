"use client";

import {useMovieStore} from "@/lib/store";
import {MovieCard} from "@/components/common/movie-card/MovieCard";
import {SearchInput} from "@/components/common/search/SearchComponents";
import styled from "styled-components";

export const StyledSearchMovies = styled.div`
    position: absolute;
    bottom: 100px;
`
export function SearchMovies() {
    const { searchQuery, searchResults, setSearchQuery, setSearchResults } = useMovieStore();

    const searchMovies = async () => {
        const res = await fetch(`http://localhost:3000/search?q=${searchQuery}`);
        const data = await res.json();
        setSearchResults(data);
    };

    return (
            <StyledSearchMovies>
                <SearchInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={'Search for a movie...'}
                />
            </StyledSearchMovies>
    );
}

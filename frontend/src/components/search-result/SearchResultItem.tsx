import {SearchResultImage, SearchResultInfo, SearchResultItemWrapper, SearchResultText, SearchResultTitle} from "@/components/search-result/styles";
import Link from "next/link";
import React from "react";
import {MovieContent} from "@/types/types";

export interface ISearchResultItemProps{
    result: MovieContent;
}


export const SearchResultItem:React.FC<ISearchResultItemProps> = ({result}) => {
    const posterUrl = result.poster_path
        ? `https://image.tmdb.org/t/p/w400${result.poster_path}`
        : "/placeholder.jpg";

    return <Link key={result.id} href={`/movie/${result.id}`}>
        <SearchResultItemWrapper>
            <SearchResultImage src={posterUrl} alt={result.title} />
            <SearchResultInfo>
                <SearchResultTitle>{result.title}</SearchResultTitle>
                <SearchResultText>Rating: {result.vote_average || "N/A"}</SearchResultText>
                <SearchResultText>Release: {result.release_date || "N/A"}</SearchResultText>
            </SearchResultInfo>
        </SearchResultItemWrapper>
    </Link>
}

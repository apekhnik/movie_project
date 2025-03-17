"use client";

import { useState, useEffect } from "react";
import { fetchAnimeById } from "@/lib/api";
import { ContentType, Movie } from "@/types/types";
import AddButton from "@/components/common/movie-card/AddButton";
import { useParams } from "next/navigation";
import { useLanguageStore } from "@/lib/stores/languageStore";
import {StyledDetailPageWrapper, StyledDetailPageContainer, StyledDetailPageDescription, StyledDetailPageError, StyledDetailPageFlexContainer, StyledDetailPageImage, StyledDetailPageMeta, StyledDetailPageTextBlock, StyledDetailPageTitle} from "@/app/styles";
import {useUiStore} from "@/lib/store";



export default function AnimeDetailPage() {
    const { id } = useParams();
    const isLoading = useUiStore((state) => state.isLoading);

    const { setIsLoading } = useUiStore();
    const language = useLanguageStore((state) => state.language);
    const [movie, setMovie] = useState<Movie | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);

        console.log(isLoading, 'before')
        setError(null);
        try {
            fetchAnimeById(id as string, language).then(setMovie);

            setIsLoading(false);
            console.log(isLoading, 'after')
        } catch (err: any) {
            setError(err.message || "Failed to load movie");
            setMovie(null);
        }
    }, [id, language]);


    if (isLoading) {
        return (
            <StyledDetailPageWrapper>
                <StyledDetailPageContainer>
                    <StyledDetailPageTitle>LOADING</StyledDetailPageTitle>
                    <StyledDetailPageError>LOADING</StyledDetailPageError>
                </StyledDetailPageContainer>
            </StyledDetailPageWrapper>
        );
    }

    if (error || !movie) {
        return (
            <StyledDetailPageWrapper>
                <StyledDetailPageContainer>
                    <StyledDetailPageTitle>Movie Details</StyledDetailPageTitle>
                    <StyledDetailPageError>Failed to load movie: {error}</StyledDetailPageError>
                </StyledDetailPageContainer>
            </StyledDetailPageWrapper>
        );
    }

    return (
        <StyledDetailPageWrapper>
            <StyledDetailPageContainer>
                <StyledDetailPageTitle>{movie.title}</StyledDetailPageTitle>
                <StyledDetailPageFlexContainer>
                    <StyledDetailPageImage
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <StyledDetailPageTextBlock>
                        <StyledDetailPageDescription>{movie.overview}</StyledDetailPageDescription>
                        <StyledDetailPageMeta>Release Date: {movie.release_date}</StyledDetailPageMeta>
                        <StyledDetailPageMeta>Rating: {movie.vote_average}</StyledDetailPageMeta>
                        <StyledDetailPageMeta>Original Language: {movie.original_language}</StyledDetailPageMeta>
                        <StyledDetailPageMeta>Popularity: {movie.popularity}</StyledDetailPageMeta>
                        <StyledDetailPageMeta>Vote Count: {movie.vote_count}</StyledDetailPageMeta>
                    </StyledDetailPageTextBlock>
                </StyledDetailPageFlexContainer>
                <AddButton id={movie.id} type={ContentType.ANIME} />
            </StyledDetailPageContainer>
        </StyledDetailPageWrapper>
    );
}

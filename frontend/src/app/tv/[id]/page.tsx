"use client";

import { useState, useEffect } from "react";
import { fetchTvShowById } from "@/lib/api";
import { ContentType, TVShow } from "@/types/types";
import AddButton from "@/components/common/movie-card/AddButton";
import { useParams } from "next/navigation";
import { useLanguageStore } from "@/lib/stores/languageStore";
import {
    StyledDetailPageWrapper,
    StyledDetailPageContainer,
    StyledDetailPageDescription,
    StyledDetailPageError,
    StyledDetailPageFlexContainer,
    StyledDetailPageImage,
    StyledDetailPageMeta,
    StyledDetailPageTextBlock,
    StyledDetailPageTitle,
} from "@/app/styles";

export default function TvDetailPage() {
    const { id } = useParams();
    const language = useLanguageStore((state) => state.language);
    const [tvShow, setTvShow] = useState<TVShow | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTvShow = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await fetchTvShowById(id as string, language);
                setTvShow(data);
            } catch (err: any) {
                setError(err.message || "Failed to load TV show");
                setTvShow(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadTvShow();
    }, [id, language]);

    if (isLoading) {
        return (
            <StyledDetailPageWrapper>
                <StyledDetailPageContainer>
                    <StyledDetailPageTitle>Loading...</StyledDetailPageTitle>
                </StyledDetailPageContainer>
            </StyledDetailPageWrapper>
        );
    }

    if (error || !tvShow) {
        return (
            <StyledDetailPageWrapper>
                <StyledDetailPageContainer>
                    <StyledDetailPageTitle>TV Show Details</StyledDetailPageTitle>
                    <StyledDetailPageError>Failed to load TV show: {error}</StyledDetailPageError>
                </StyledDetailPageContainer>
            </StyledDetailPageWrapper>
        );
    }

    return (
        <StyledDetailPageWrapper>
            <StyledDetailPageContainer>
                <StyledDetailPageTitle>{tvShow.name}</StyledDetailPageTitle>
                <StyledDetailPageFlexContainer>
                    <StyledDetailPageImage
                        src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                        alt={tvShow.name}
                    />
                    <StyledDetailPageTextBlock>
                        <StyledDetailPageDescription>{tvShow.overview}</StyledDetailPageDescription>
                        <StyledDetailPageMeta>First Air Date: {tvShow.first_air_date}</StyledDetailPageMeta>
                        <StyledDetailPageMeta>Rating: {tvShow.vote_average}</StyledDetailPageMeta>
                        <StyledDetailPageMeta>Original Language: {tvShow.original_language}</StyledDetailPageMeta>
                        <StyledDetailPageMeta>Popularity: {tvShow.popularity}</StyledDetailPageMeta>
                        <StyledDetailPageMeta>Vote Count: {tvShow.vote_count}</StyledDetailPageMeta>
                        <StyledDetailPageMeta>Seasons: {tvShow.number_of_seasons}</StyledDetailPageMeta>
                        <StyledDetailPageMeta>Episodes: {tvShow.number_of_episodes}</StyledDetailPageMeta>
                    </StyledDetailPageTextBlock>
                </StyledDetailPageFlexContainer>
                <AddButton id={tvShow.id} type={ContentType.TV} />
            </StyledDetailPageContainer>
        </StyledDetailPageWrapper>
    );
}

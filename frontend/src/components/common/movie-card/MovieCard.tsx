"use client";

import React from "react";
import { ContentType, MovieContent, TVShowContent } from "@/types/types";
import Link from "next/link";
import AddButton from "@/components/common/movie-card/AddButton";
import {
    StyledMovieCard,
    StyledMovieCardButtonWrapper,
    StyledMovieCardDescription,
    StyledMovieCardImg,
    StyledMovieCardText,
    StyledMovieCardTitle,
} from "@/components/common/movie-card/styles";
import { useUiStore } from "@/lib/store";

interface MovieCardProps {
    content: MovieContent | TVShowContent; // Общий тип для контента
    contentType: ContentType; // Тип контента для условной логики
}

export function MovieCard({ content, contentType = ContentType.MOVIE }: MovieCardProps): React.ReactElement {
    const posterUrl = content.poster_path
        ? `https://image.tmdb.org/t/p/w500${content.poster_path}`
        : "/placeholder.jpg";

    // Определяем отображаемые данные в зависимости от contentType
    const isMovieOrAnime = contentType === ContentType.MOVIE || contentType === ContentType.ANIME;
    const title = isMovieOrAnime ? (content as MovieContent).title : (content as TVShowContent).name;
    const releaseDate = isMovieOrAnime ? (content as MovieContent).release_date : (content as TVShowContent).first_air_date;

    return (
        <StyledMovieCard>
            <Link href={`/${contentType}/${content.id}`} className="block">
                <StyledMovieCardImg src={posterUrl} alt={title} />
                <StyledMovieCardDescription>
                    <StyledMovieCardTitle>{title}</StyledMovieCardTitle>
                    <StyledMovieCardText>Rating: {content.vote_average}</StyledMovieCardText>
                    <StyledMovieCardText>
                        Release: {releaseDate || "N/A"}
                    </StyledMovieCardText>
                    {contentType === ContentType.TV && (
                        <StyledMovieCardText>
                            Seasons: {(content as TVShowContent).number_of_seasons || "N/A"}
                        </StyledMovieCardText>
                    )}
                    <StyledMovieCardButtonWrapper>
                        <AddButton id={content.id} type={contentType} />
                    </StyledMovieCardButtonWrapper>
                </StyledMovieCardDescription>
            </Link>
        </StyledMovieCard>
    );
}

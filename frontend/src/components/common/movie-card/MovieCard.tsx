"use client";

import React from "react";
import { ContentType, Movie } from "@/types/types";
import Link from "next/link";
import AddButton from "@/components/common/movie-card/AddButton";
import {StyledMovieCard, StyledMovieCardButtonWrapper, StyledMovieCardDescription, StyledMovieCardImg, StyledMovieCardText, StyledMovieCardTitle} from "@/components/common/movie-card/styles";
import {useUiStore} from "@/lib/store";

interface MovieCardProps {
    movie: Movie;
    contentType: ContentType;
}

export function MovieCard(props: MovieCardProps): React.ReactElement {
    const { movie, contentType = ContentType.MOVIE } = props;

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "/placeholder.jpg";

    return (
        <StyledMovieCard>
            <Link href={`/${contentType}/${props.movie.id}`} className="block">
                <StyledMovieCardImg src={posterUrl} alt={movie.title} />
                <StyledMovieCardDescription>
                    <StyledMovieCardTitle>{movie.title}</StyledMovieCardTitle>
                    <StyledMovieCardText>Rating: {movie.vote_average}</StyledMovieCardText>
                    <StyledMovieCardText>Release: {movie.release_date}</StyledMovieCardText>
                    <StyledMovieCardButtonWrapper>
                        <AddButton id={movie.id} type={props.contentType} />
                    </StyledMovieCardButtonWrapper>
                </StyledMovieCardDescription>
            </Link>
        </StyledMovieCard>
    );
}

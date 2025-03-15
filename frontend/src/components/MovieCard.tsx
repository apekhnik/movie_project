"use client";

import React from "react";
import { ContentType, Movie } from "@/types/types";
import Link from "next/link";
import AddToProfileButton from "@/components/common/AddToProfileButton";
import styled from "styled-components";

interface MovieCardProps {
    movie: Movie;
    contentType: ContentType;
}

const StyledMovieCard = styled.div`
    position: relative;
    width: 250px;
    height: 300px;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s ease-in-out;

    &:hover {
        img {
            filter: brightness(50%);
        }

        div {
            bottom: 0;
            opacity: 1;
        }
    }
`;

const StyledImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.3s ease-in-out;
`;

const StyledDescription = styled.div`
    position: absolute;
    bottom: -100%;
    left: 0;
    right: 0;
    padding: 10px;
    background: rgba(0, 0, 0, 0.85);
    color: white;
    opacity: 0;
    transition: bottom 0.3s ease-in-out, opacity 0.3s ease-in-out;
`;

const StyledTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 4px;
`;

const StyledText = styled.p`
    font-size: 0.75rem;
    color: #d1d5db;
    margin-bottom: 4px;
`;

const StyledButtonWrapper = styled.div`
    margin-top: 6px;
    display: flex;
    justify-content: center;
`;

export function MovieCard(props: MovieCardProps): React.ReactElement {
    const { movie, contentType = ContentType.MOVIE } = props;

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "/placeholder.jpg";

    return (
        <StyledMovieCard>
            <Link href={`/${contentType}/${props.movie.id}`} className="block">
                <StyledImg src={posterUrl} alt={movie.title} />
                <StyledDescription>
                    <StyledTitle>{movie.title}</StyledTitle>
                    <StyledText>Rating: {movie.vote_average}</StyledText>
                    <StyledText>Release: {movie.release_date}</StyledText>
                    <StyledButtonWrapper>
                        <AddToProfileButton id={movie.id} type={props.contentType} />
                    </StyledButtonWrapper>
                </StyledDescription>
            </Link>
        </StyledMovieCard>
    );
}

"use client";

import React from "react";
import {ContentType, Movie} from "@/types/types";
import Link from "next/link";
import AddToProfileButton from "@/components/common/AddToProfileButton";

interface MovieCardProps {
    movie: Movie;
    contentType: ContentType;
}

export function MovieCard(props: MovieCardProps): React.ReactElement {
    const {movie, contentType = ContentType.MOVIE} = props;

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "/placeholder.jpg";

    return (
        <div className="border p-4 rounded shadow">
            <Link href={`/${contentType}/${props.movie.id}`} className="block">
                <img src={posterUrl} alt={movie.title} className="w-full h-64 object-cover mb-2" />
                <h2 className="text-xl font-semibold">{movie.title}</h2>
                <p className="text-gray-600 truncate">{movie.overview}</p>
                <p className="text-sm text-gray-500">Rating: {movie.vote_average}</p>
                <p className="text-sm text-gray-500">Release: {movie.release_date}</p>
            </Link>

            <AddToProfileButton id={movie.id} type={props.contentType}/>
        </div>
    );
}

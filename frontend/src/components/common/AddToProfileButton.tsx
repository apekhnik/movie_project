"use client";

import { useState } from "react";
import { addMovieToProfileById, removeMovieFromProfile } from "@/lib/api";
import { toast } from "react-toastify";
import { useMovieStore } from "@/lib/stores/movieStore";
import {ContentType} from "@/types/types";

interface AddToProfileButtonProps {
    id: number;
    type: ContentType
}

export default function AddToProfileButton({ id, type }: AddToProfileButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { movieIds, addMovieId, removeMovieId } = useMovieStore();
    const isAdded = movieIds.includes(id);

    const handleAdd = async () => {
        setIsLoading(true);
        try {
            await addMovieToProfileById(id, type);
            addMovieId(id);
            toast.success("Movie added to profile!");
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemove = async () => {
        setIsLoading(true);
        try {
            await removeMovieFromProfile(id);
            removeMovieId(id);
            toast.success("Movie removed from profile!");
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={isAdded ? handleRemove : handleAdd}
            disabled={isLoading}
            className={`mt-2 p-2 rounded text-white ${
                isAdded ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
            } disabled:bg-gray-400`}
        >
            {isLoading ? "Processing..." : isAdded ? "Remove" : "Add to Profile"}
        </button>
    );
}

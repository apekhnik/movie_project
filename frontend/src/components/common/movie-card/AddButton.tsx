"use client";

import { useState } from "react";
import { addMovieToProfileById, removeMovieFromProfile } from "@/lib/api";
import { toast } from "react-toastify";
import { useMovieStore } from "@/lib/stores/movieStore";
import { ContentType } from "@/types/types";
import styled from "styled-components";

interface AddToProfileButtonProps {
    id: number;
    type: ContentType;
}

export default function AddButton({ id, type }: AddToProfileButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { movieIds, addMovieId, removeMovieId } = useMovieStore();
    const isAdded = movieIds.includes(id);

    const handleAdd = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation(); // Предотвращаем всплытие события
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

    const handleRemove = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        event.stopPropagation(); // Предотвращаем всплытие события
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
        <StyledButton
            onClick={isAdded ? handleRemove : handleAdd}
            disabled={isLoading}
            isAdded={isAdded}
        >
            {isLoading ? "..." : isAdded ? "-" : "+"}
        </StyledButton>
    );
}

const StyledButton = styled.button<{ isAdded: boolean }>`
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${(props) => (props.isAdded ? "#ef4444" : "#3b82f6")};
    color: white;
    border: none;
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.3s ease-in-out, transform 0.3s ease-in-out;

    &:hover {
        background: ${(props) => (props.isAdded ? "#dc2626" : "#2563eb")};
        transform: scale(1.1);
    }

    &:disabled {
        background: #6b7280;
        cursor: not-allowed;
        transform: none;
    }
`;

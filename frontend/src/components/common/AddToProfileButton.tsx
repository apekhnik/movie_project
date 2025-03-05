"use client";

import { useState } from "react";
import { addMovieToProfileById } from "@/lib/api";
import { toast } from "react-toastify";

interface AddToProfileButtonProps {
    id: number; // ID фильма
}

export default function AddToProfileButton({ id }: AddToProfileButtonProps) {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToProfile = async () => {
        setIsAdding(true);
        try {
            await addMovieToProfileById(id); // Отправляем только id
            toast.success("Added to profile!");
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <button
            onClick={handleAddToProfile}
            disabled={isAdding}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
        >
            {isAdding ? "Adding..." : "Add to Profile"}
        </button>
    );
}

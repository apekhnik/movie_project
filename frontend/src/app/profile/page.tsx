"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/store";
import { fetchProfile } from "@/lib/api";

export default function ProfilePage() {
    const { isAuthenticated } = useAuthStore();
    const [profile, setProfile] = useState<{ id: number; login: string; movieList: any[] } | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            fetchProfile()
                .then((data) => setProfile(data))
                .catch((err) => setError(err.message));
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return <div className="container mx-auto p-4">Please log in to view your profile.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Profile</h1>
            {error ? (
                <p className="text-red-700">{error}</p>
            ) : profile ? (
                <div>
                    <p>ID: {profile.id}</p>
                    <p>Login: {profile.login}</p>
                    <p>Movie List: {JSON.stringify(profile.movieList)}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

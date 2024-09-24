import { useState, useEffect, useCallback, useMemo } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { UserProfile } from "auth0";
import {showToast} from "@/components/global/ToasterManager";

/**
 * Custom hook for managing authenticated user data
 * @returns An object containing user data, loading state, error state, and utility functions
 */
export const useAuthUser = () => {
    const { user: auth0User, error: auth0Error, isLoading: isAuth0Loading, checkSession } = useUser();
    const [profileData, setProfileData] = useState<UserProfile | null>(null);
    const [isFetchingProfile, setIsFetchingProfile] = useState(false);

    /**
     * Fetches the user's profile from the server
     */
    const fetchUserProfile = useCallback(async () => {
        if (!auth0User) return;

        try {
            setIsFetchingProfile(true);
            const response = await fetch('/api/auth/me');
            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }
            const data = await response.json();
            setProfileData(data);
        } catch (error) {
            showToast.error('Failed to fetch user profile');
        } finally {
            setIsFetchingProfile(false);
        }
    }, [auth0User]);

    useEffect(() => {
        if (auth0User && !profileData && !isFetchingProfile) {
            fetchUserProfile();
        }
    }, [auth0User, profileData, isFetchingProfile, fetchUserProfile]);


    const userProfile = useMemo(() => (profileData || auth0User) as UserProfile, [profileData, auth0User]);

    /**
     * Refreshes the user's profile data
     */
    const refreshUserProfile = useCallback(() => {
        setProfileData(null);
        fetchUserProfile();
    }, [fetchUserProfile]);

    return {
        user: userProfile,
        error: auth0Error,
        isLoading: isAuth0Loading || isFetchingProfile,
        checkSession,
        fetchUserProfile,
        refreshUserProfile,
    };
};

export default useAuthUser;
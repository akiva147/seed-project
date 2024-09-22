import { CredentialResponse, googleLogout } from '@react-oauth/google';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { userService } from 'src/services/user.service';
import { jwtDecode } from 'jwt-decode';

export const useUser = () => {
    const token = localStorage.getItem('loginToken');
    const isTokenValid = token === null ? false : jwtDecode(token);
    console.log('useUser  isTokenValid:', isTokenValid);

    const logOut = () => {
        googleLogout();
        localStorage.removeItem('loginToken');
    };

    const { data: currentUser, status } = useQuery({
        enabled: Boolean(isTokenValid),
        queryKey: ['loginUser'],
        queryFn: async () => await userService.getLoggedInUser(),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    return {
        currentUserStatus: status,
        currentUser,
        logoutUser: logOut,
    };
};

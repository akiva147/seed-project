import { CredentialResponse, googleLogout } from '@react-oauth/google';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { userService } from 'src/services/user.service';
import { jwtDecode } from 'jwt-decode';
import { useLocalStorage } from './useStorage';

export const useUser = () => {
    const [token, setToken, removeToken] = useLocalStorage('loginToken', null);

    const isTokenValid = useMemo(
        () => (token === null ? false : jwtDecode(token)),
        [token]
    );

    const logOut = () => {
        googleLogout();
        removeToken();
        window.location.reload();
    };

    const { data: currentUser, status } = useQuery({
        enabled: Boolean(isTokenValid),
        queryKey: ['loginUser'],
        queryFn: async () => await userService.getLoggedInUser(),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    return {
        token,
        setToken,
        currentUserStatus: status,
        currentUser,
        logoutUser: logOut,
    };
};

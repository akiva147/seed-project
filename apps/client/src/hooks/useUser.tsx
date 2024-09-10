import { CredentialResponse, googleLogout } from '@react-oauth/google';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { AccountInfo } from 'src/contexts/UserProvider';
import { userService } from 'src/services/user.service';

export const useUser = () => {
    // const [currGoogleUser, setCurrGoogleUser] = useState<
    //     AccountInfo | undefined
    // >(undefined);

    // const setCurrentUser = (credentialResponse: CredentialResponse): AccountInfo => {

    // }
    const [credentialResponse, setCredentialResponse] = useState<
        CredentialResponse | undefined
    >(undefined);

    const logout = async () => {
        googleLogout();
        // setCurrGoogleUser(undefined);
    };

    const { data: currentUser, status } = useQuery({
        enabled: Boolean(credentialResponse),
        queryKey: ['loginUser'],
        queryFn: async () =>
            await userService.getLoggedInUser(credentialResponse),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    return {
        currentUserStatus: status,
        setCredentialResponse,
        currentUser,
        logoutUser: logout,
    };
};

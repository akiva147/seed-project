import { CodeResponse } from '@react-oauth/google';
import axios from 'axios';
import { validateEnvs } from './env.util';
import { Dispatch, SetStateAction } from 'react';

export const getRefreshToken = (
    codeResponse: CodeResponse,
    setToken: Dispatch<SetStateAction<string | null>>
) => {
    const {
        VITE_GOOGLE_CLIENT_ID,
        VITE_GOOGLE_CLIENT_SECRET,
        VITE_GOOGLE_REDIRECT_URI,
    } = validateEnvs();
    // get refresh token using authorization code
    const payload = {
        grant_type: 'authorization_code',
        code: codeResponse.code,
        client_id: VITE_GOOGLE_CLIENT_ID,
        client_secret: VITE_GOOGLE_CLIENT_SECRET,
        redirect_uri: VITE_GOOGLE_REDIRECT_URI,
    };

    axios
        .post('https://oauth2.googleapis.com/token', payload, {
            headers: {
                'Content-Type': 'application/json;',
            },
        })
        .then((res: any) => res.data)
        .then((response: any) => {
            setToken(response.id_token);
        })
        .catch((error) => console.log('getRefreshToken error: ', error));
};

export const getNewAccessToken = (
    token: string,
    setToken: React.Dispatch<any>
) => {
    const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_CLIENT_SECRET } = validateEnvs();

    // get new access token using refresh token
    const payloadForAccessToken = {
        grant_type: 'refresh_token',
        refresh_token: token,
        client_id: VITE_GOOGLE_CLIENT_ID,
        client_secret: VITE_GOOGLE_CLIENT_SECRET,
    };

    axios
        .post('https://oauth2.googleapis.com/token', payloadForAccessToken, {
            headers: {
                'Content-Type': 'application/json;',
            },
        })
        .then((res: any) => res.data)
        .then((res) => {
            setToken(res.id_token);
        })
        .catch((error) => console.log('getNewAccessToken error: ', error));
};

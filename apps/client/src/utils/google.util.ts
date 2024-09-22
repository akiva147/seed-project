import { CodeResponse } from '@react-oauth/google';
import axios from 'axios';
import { validateEnvs } from './env.util';

export const getRefreshToken = (
    codeResponse: CodeResponse,
    setToken: React.Dispatch<React.SetStateAction<string | undefined>>
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
            localStorage.setItem('loginToken', response.id_token);
            console.log('.then  response:', response.id_token);
            setToken(response.id_token);
        })
        .catch((err) => console.log('err: ', err));
};

export const getNewAccessToken = (
    token: string,
    setToken: React.Dispatch<React.SetStateAction<string | undefined>>
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
            setToken(res);
            console.log('new token response: ', res);
        })
        .catch((err) => console.log('err: ', err));
};

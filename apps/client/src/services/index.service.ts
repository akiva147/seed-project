import axios, { AxiosHeaders } from 'axios';
import { useContext } from 'react';
import { TokenContext } from '../contexts/TokenContext';
import { validateEnvs } from '../utils/env.util';

const { VITE_SERVER_LOCATION } = validateEnvs();

export const authenticatedInstance = axios.create({
    baseURL: VITE_SERVER_LOCATION,
});

/**
 * Async function for making API Request
 * @returns Instance Of Axios Object With Auth Header on it
 */
authenticatedInstance.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem('loginToken');
    if (!accessToken) throw new Error('Access token is undefined');

    // If headers are not AxiosHeaders, create an instance
    if (!(config.headers instanceof AxiosHeaders)) {
        config.headers = new AxiosHeaders(config.headers || {});
    }

    // Set the Authorization header
    config.headers.set('Authorization', `Bearer ${accessToken}`);

    return config;
});

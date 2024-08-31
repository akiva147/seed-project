import axios from 'axios';
import { validateEnvs } from 'src/utils/env.util';

const { VITE_SERVER_LOCATION } = validateEnvs();

export const authenticatedInstance = axios.create({
    baseURL: VITE_SERVER_LOCATION,
});

/**
 * Async function for making API Request
 * @returns Instance Of Axios Object With Auth Header on it
 */
authenticatedInstance.interceptors.request.use(async (config) => {
    // const accessToken: string = await acquireAccessToken();
    const accessToken = '';
    return {
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
        },
    };
});

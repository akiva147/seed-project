// import { User, UserSchema } from '@terror-monitor/models';
// import { axiosInstance } from './axios.service';
import axios from 'axios';
import { CredentialResponse } from '@react-oauth/google';
import { authenticatedInstance } from './index.service';

const PREFIX = 'user';

export class UserService {
    async getLoggedInUser(credentialResponse: CredentialResponse | undefined) {
        try {
            if (!credentialResponse)
                throw new Error('Credential response in undefined');
            const { data } = await authenticatedInstance.get(`${PREFIX}/me`, {
                headers: {
                    Authorization: `Bearer ${credentialResponse.credential}`,
                },
            });
            console.log('🚀 ~ UserService ~ getLoggedInUser ~ data:', data);

            // UserSchema.parse(data);
            return data;
        } catch (error) {
            console.error('Error fetching user', error);
            throw new Error('Error fetching user');
        }
    }
}

export const userService = new UserService();

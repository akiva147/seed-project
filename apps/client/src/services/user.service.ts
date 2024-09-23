// import { User, UserSchema } from '@terror-monitor/models';
// import { axiosInstance } from './axios.service';
import axios from 'axios';
import { CredentialResponse } from '@react-oauth/google';
import { authenticatedInstance } from './index.service';
import { UserSchema } from '@seed-project/models';

const PREFIX = 'user';

export class UserService {
    async getLoggedInUser() {
        try {
            const { data } = await authenticatedInstance.get(`${PREFIX}/me`);
            const user = UserSchema.parse(data);

            return user;
        } catch (error) {
            console.error('Error fetching user', error);
            throw new Error('Error fetching user');
        }
    }
}

export const userService = new UserService();

import { UserSchema } from '@seed-project/models';
import { authenticatedInstance } from './index.service';

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

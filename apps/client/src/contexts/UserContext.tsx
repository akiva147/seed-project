import { User } from '@seed-project/models';
import { createContext, useEffect, useState } from 'react';
import {} from '@react-oauth/google';

export interface UserContextProps {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const UserContext = createContext<UserContextProps>({
    user: undefined,
    setUser: () => {},
});

export interface UserProviderProps {
    children?: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

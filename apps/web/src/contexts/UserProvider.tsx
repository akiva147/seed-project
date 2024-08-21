import { createContext, useState } from 'react';

export type AccountInfo = {
    userName: string
}
export interface UserContextProps {
    currentUser: AccountInfo | undefined;
}

export const UserContext = createContext<UserContextProps>({
    currentUser: undefined,
});

export interface UserProviderProps {
    children?: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [currentUser] = useState<AccountInfo | undefined>(undefined)

    return (
        <UserContext.Provider value={{ currentUser }}>
            {children}
        </UserContext.Provider>
    );
};

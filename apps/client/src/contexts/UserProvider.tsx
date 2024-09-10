import { createContext, useState } from 'react';

export type AccountInfo = {
    userName: string;
};
export interface UserContextProps {
    user: AccountInfo | undefined;
    setUser: React.Dispatch<React.SetStateAction<AccountInfo | undefined>>;
}

export const UserContext = createContext<UserContextProps>({
    user: undefined,
    setUser: () => {},
});

export interface UserProviderProps {
    children?: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AccountInfo | undefined>(undefined);

    const setCurrentUser = (
        credentialResponse: CredentialResponse
    ): AccountInfo => {};

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

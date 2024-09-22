import { createContext, useState } from 'react';

export interface TokenContextProps {
    token: string | undefined;
    setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const TokenContext = createContext<TokenContextProps>({
    token: undefined,
    setToken: () => {},
});

export interface TokenProviderProps {
    children?: React.ReactNode;
}

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | undefined>(undefined);

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};

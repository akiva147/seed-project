import { ReactNode } from 'react';

interface AuthProviderProps {
    children?: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => (
    <>{children}</>
);

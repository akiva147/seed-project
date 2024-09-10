import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactNode } from 'react';
import { validateEnvs } from 'src/utils/env.util';

interface AuthProviderProps {
    children?: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const { VITE_GOOGLE_CLIENT_ID } = validateEnvs();
    return (
        <GoogleOAuthProvider clientId={VITE_GOOGLE_CLIENT_ID}>
            {children}
        </GoogleOAuthProvider>
    );
};

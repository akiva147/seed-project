import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './AuthProvider';
import { TokenProvider } from './TokenContext';

const queryClient = new QueryClient();
export interface GlobalProviderProps {
    children?: React.ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => (
    <AuthProvider>
        <QueryClientProvider client={queryClient}>
            <TokenProvider>{children}</TokenProvider>
        </QueryClientProvider>
    </AuthProvider>
);

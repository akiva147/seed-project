import { Navigate } from 'react-router-dom';
import { Layout } from 'src/components/Layout';
import { useUser } from 'src/hooks/useUser';

export interface AuthenticatedRoutesProps {}

export const AuthenticatedRoutes: React.FC<AuthenticatedRoutesProps> = () => {
    const { currentUser } = useUser();
    console.log('currentUser:', currentUser);
    return currentUser ? <Layout /> : <Navigate to={'/login'} />;
};

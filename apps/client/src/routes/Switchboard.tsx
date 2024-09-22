import {
    createBrowserRouter,
    Navigate,
    redirect,
    RouterProvider,
} from 'react-router-dom';
import { AuthenticatedRoutes } from './AuthenticatedRoutes';
import { PublicRoutes } from './PublicRoutes';
import { Layout } from 'src/components/Layout';
import { BaseErrorBoundary } from 'src/components/BaseErrorBoundary';
import { Notes } from 'src/components/Notes';
import { useContext } from 'react';
import { LoginPage } from 'src/pages/LoginPage';
import { User } from '@seed-project/models';
import { UserContext } from 'src/contexts/UserContext';
import { useUser } from 'src/hooks/useUser';

export interface SwitchboardProps {}

const getRouter = (currentUser: User | undefined) =>
    createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            errorElement: <BaseErrorBoundary />,
            loader: async () => {
                console.log('loader:  currentUser:', currentUser);
                if (!currentUser) {
                    throw redirect('/login');
                }

                return { currentUser };
            },
            children: [
                { path: '/', element: <Navigate to="/notes" /> },
                { path: '/notes', element: <Notes /> },
            ],
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '*',
            element: <Navigate to="/login" />,
        },
    ]);

export const Switchboard: React.FC<SwitchboardProps> = () => {
    const { currentUser } = useUser();
    console.log('currentUser:', currentUser);

    return <RouterProvider router={getRouter(currentUser)} />;
};

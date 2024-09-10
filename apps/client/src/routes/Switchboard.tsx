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
import { AccountInfo, UserContext } from 'src/contexts/UserProvider';
import { useContext } from 'react';
import { LoginPage } from 'src/pages/LoginPage';

export interface SwitchboardProps {}

const getRouter = (currentUser: AccountInfo | undefined) =>
    createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            errorElement: <BaseErrorBoundary />,
            loader: async () => {
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
    const { user: currentUser } = useContext(UserContext);

    return <RouterProvider router={getRouter(currentUser)} />;
};

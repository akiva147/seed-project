import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from 'react-router-dom';
import { BaseErrorBoundary } from 'src/components/BaseErrorBoundary';
import { Layout } from 'src/components/Layout';
import { Notes } from 'src/components/Notes';

export interface AuthenticatedRoutesProps {}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <BaseErrorBoundary />,
        children: [
            { path: '/', element: <Navigate to="/notes" /> },
            { path: '/notes', element: <Notes /> },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/notes" />,
    },
]);

export const AuthenticatedRoutes: React.FC<AuthenticatedRoutesProps> = () => (
    <RouterProvider router={router} />
);

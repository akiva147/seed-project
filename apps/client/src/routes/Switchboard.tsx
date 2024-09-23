import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { Notes } from 'src/components/Notes';
import { LoginPage } from 'src/pages/LoginPage';
import { HomePage } from 'src/components/HomePage';
import { AuthenticatedRoutes } from './AuthenticatedRoutes';

export interface SwitchboardProps {}

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<AuthenticatedRoutes />}>
                <Route element={<HomePage />} path="/" index />
                <Route element={<Notes />} path="/notes" />
            </Route>
            <Route element={<LoginPage />} path="/login" />
        </>
    )
);

export const Switchboard: React.FC<SwitchboardProps> = () => (
    <RouterProvider router={router} />
);

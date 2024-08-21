import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from 'src/pages/LoginPage';

export interface PublicRoutesProps { }

export const PublicRoutes: React.FC<PublicRoutesProps> = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<LoginPage />} />
		</Routes>
	</BrowserRouter>
);

import { GlobalProvider } from './contexts/GlobalProvider';
import { Switchboard } from './routes/Switchboard';

export const App = () => (
    <GlobalProvider>
        <Switchboard />
    </GlobalProvider>
);

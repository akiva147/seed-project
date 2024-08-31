import { validateEnvs } from "src/utils/env.util";

const { VITE_CLIENT_URL } = validateEnvs();

export const ENVIRONMENT_SETTINGS = {
    ['dev-' + VITE_CLIENT_URL]: 'פיתוח',
    ['stage-' + VITE_CLIENT_URL]: 'תצוגה',
    [VITE_CLIENT_URL]: 'מבצעית',
};

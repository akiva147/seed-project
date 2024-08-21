import { validateEnvs } from 'src/utils/env.util';

const { VITE_WEB_URL } = validateEnvs();

export const ENVIRONMENT_SETTINGS = {
    ['dev-' + VITE_WEB_URL]: 'פיתוח',
    ['stage-' + VITE_WEB_URL]: 'תצוגה',
    ['drills-' + VITE_WEB_URL]: 'תרגילית',
    [VITE_WEB_URL]: 'מבצעית',
};

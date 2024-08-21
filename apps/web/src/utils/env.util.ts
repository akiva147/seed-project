import { z } from 'zod';

const EnvSchema = z.object({
    VITE_BACKEND_LOCATION: z.string(),
    VITE_WEB_URL: z.string(),
    VITE_WEB_TITLE: z.string(),
});

type Env = z.infer<typeof EnvSchema>;

export const validateEnvs = (): Env => {
    const parsedEnv = EnvSchema.safeParse(import.meta.env);

    if (!parsedEnv.success) {
        console.log(parsedEnv.error);
        throw new Error('Invalid environment variables');
    }

    return parsedEnv.data;
};

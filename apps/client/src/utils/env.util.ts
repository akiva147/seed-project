import { z } from 'zod';

const EnvSchema = z.object({
    VITE_SERVER_LOCATION: z.string(),
    VITE_CLIENT_URL: z.string(),
    VITE_CLIENT_TITLE: z.string(),
    VITE_GOOGLE_CLIENT_ID: z.string(),
    VITE_GOOGLE_CLIENT_SECRET: z.string(),
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

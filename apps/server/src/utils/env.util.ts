import { z } from 'zod';

export const EnvSchema = z.object({
  PORT: z.string().default('5000'),
  CLIENT_URL: z.string().default('http://localhost:3000'),
  DB_CONNECTION: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string(),
});

type Env = z.infer<typeof EnvSchema>;

export const validateEnvs = (): Env => {
  const { env } = process;

  const parsedEnv = EnvSchema.safeParse(env);

  if (!parsedEnv.success) {
    throw new Error('Invalid environment variables');
  }

  return parsedEnv.data;
};

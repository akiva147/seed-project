import { z } from 'zod';
import { EnvironmentVariables } from '../types/env.types.js';

export const EnvSchema = z.object({
  PORT: z.string().default('5000'),
  CLIENT_URL: z.string().default('http://localhost:3000'),
  DB_CONNECTION: z.string()
});

export const validateEnvs = ():EnvironmentVariables => {
  const { env } = process;

  const parsedEnv = EnvSchema.safeParse(env);

  if (!parsedEnv.success) {
    throw new Error('Invalid environment variables');
  }

  return parsedEnv.data;
};


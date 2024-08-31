import { Provider } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { validateEnvs } from '../utils/env.util.js';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATABASE_CLIENT',
    useFactory: async (): Promise<MongoClient> => {
      const { DB_CONNECTION } = validateEnvs();

      try {
        const client = await MongoClient.connect(DB_CONNECTION, {
          ignoreUndefined: true,
        });
        console.log('Successfully connected to MongoDB.');
        return client;
      } catch (error) {
        throw error;
      }
    },
  },
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (client: MongoClient): Promise<Db> => {
      try {
        return client.db();
      } catch (error) {
        throw error;
      }
    },
    inject: ['DATABASE_CLIENT'],
  },
];

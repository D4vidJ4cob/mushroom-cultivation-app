import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { DatabaseConfig, ServerConfig } from '../config/configuration';
import { Inject } from '@nestjs/common';
import * as schema from './schema';

export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    inject: [ConfigService],

    useFactory: (configService: ConfigService<ServerConfig>) => {
      const databaseConfig = configService.get<DatabaseConfig>('database')!;

      const pool = new Pool({
        connectionString: databaseConfig.url,
        max: 5, // Connection pool size
        ssl:
          process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
      });

      return drizzle({
        client: pool,
        schema,
      });
    },
  },
];

export const InjectDrizzle = () => Inject(DrizzleAsyncProvider);

export type DatabaseProvider = NodePgDatabase<typeof schema> & {
  $client: Pool;
};

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ZodValidationPipe } from 'nestjs-zod';
import { MongoDBModule } from './database/database.module.js';
import { RolesGuard } from './guards/roles.guard.js';
import { HealthModule } from './modules/health/health.module.js';
import { NotesModule } from './modules/notes/notes.module.js';
import { AllExceptionsFilter } from './errors/catch-all-exception.filter.js';
import { MongodbExceptionFilter } from './errors/mongodb-exception.filter.js';
import { UserModule } from './modules/user/user.module.js';
import { AuthModule } from './auth/auth.module.js';
import { AuthGuard } from './guards/auth.guard.js';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), //Enable .env file
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60,
          limit: 10,
        },
      ],
    }),
    MongoDBModule,
    HealthModule,
    NotesModule,
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: MongodbExceptionFilter,
    },
  ],
})
export class AppModule {}

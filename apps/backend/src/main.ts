import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import { AppModule } from './app.module.js';
import { validateEnvs } from './utils/env.util.js';

async function bootstrap() {
  const { PORT = 5000, CLIENT_URL } = validateEnvs();

  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  app.enableCors({
    credentials: true,
    origin: CLIENT_URL,
  });

  app.use(helmet(), hpp(), compression());

  await app.listen(PORT);
  console.log(`Server listening on port ${PORT}`);
}
bootstrap();

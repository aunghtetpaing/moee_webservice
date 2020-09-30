import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Application Configuration
import { AppConfig } from './config/app.config';
import { GlobalValidationPipe } from './config/globalValidation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`${AppConfig.prefix}/v${AppConfig.version}`);
  app.useGlobalPipes(new GlobalValidationPipe());

  await app.listen(AppConfig.port);
}

bootstrap();

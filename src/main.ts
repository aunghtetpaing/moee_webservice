import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AppConfig } from './config/app.config';
import { GlobalExpectionFilter } from './config/globalExpectionFilter';
import { GlobalGuards } from './config/globalGuards';
import { GlobalValidationPipe } from './config/globalValidation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`${AppConfig.prefix}/v${AppConfig.version}`);
  
  app.useGlobalPipes(new GlobalValidationPipe());
  app.useGlobalFilters(new GlobalExpectionFilter());
  app.useGlobalGuards(new GlobalGuards());

  await app.listen(AppConfig.port);
}

bootstrap();

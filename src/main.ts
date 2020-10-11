import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AppConfig } from './config/app.config';

import { GlobalExpectionFilter } from './config/globalExpectionFilter';
import { GlobalValidationPipe } from './config/globalValidation.pipe';

import { AppLogger } from './services/logger.service';
import { isEnv } from './utilites/config.utilites';

const appStatus = isEnv(AppConfig);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`${AppConfig.prefix}/v${AppConfig.version}`);
  
  app.useGlobalPipes(new GlobalValidationPipe());
  app.useGlobalFilters(new GlobalExpectionFilter());

  app.useLogger(app.get(AppLogger));
  
  await app.listen(AppConfig.port);
}

if(!appStatus.includes(true)) {
  bootstrap();
}



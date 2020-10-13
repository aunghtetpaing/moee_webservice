import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AppConfig } from './config/app.config';

import { GlobalExpectionFilter } from './config/globalExpectionFilter';

import { AppLogger } from './services/logger.service';
import { isEnv } from './utilites/config.utilites';

const appStart = isEnv(AppConfig);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`${AppConfig.prefix}/v${AppConfig.version}`);
  
  app.useGlobalFilters(new GlobalExpectionFilter());
  app.useLogger(app.get(AppLogger));
  
  await app.listen(AppConfig.port);
}

if(!appStart.includes(true)) {
  bootstrap();
}



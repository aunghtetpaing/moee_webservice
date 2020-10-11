import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module, Scope } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './cores/auth/auth.module';
import { UserModule } from './cores/users/user.module';
import { VerifyCodeModule } from './cores/verifyCode/verifycode.module';

import { dbConfig } from './config/database.config';

import { GlobalLoggerInterceptor } from './config/globals/global.interceptor';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppLogger } from './services/logger.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UserModule,
    VerifyCodeModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppLogger,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: GlobalLoggerInterceptor
    }
  ],
})
export class AppModule {}

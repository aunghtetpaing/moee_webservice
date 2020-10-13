import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { Module, Scope } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './cores/auth/auth.module';
import { UserModule } from './cores/users/user.module';
import { VerifyCodeModule } from './cores/verifyCode/verifycode.module';

import { dbConfig } from './config/database.config';

import { GlobalInterceptor } from './config/globals/global.interceptor';
import { GlobalValidationPipe } from './config/globalValidation.pipe';

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
      useClass: GlobalInterceptor
    },
    {
      provide: APP_PIPE,
      useClass: GlobalValidationPipe,
    }
  ],
})
export class AppModule {}

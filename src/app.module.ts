import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './cores/auth/auth.module';
import { UserModule } from './cores/users/user.module';
import { VerifyCodeModule } from './cores/verifyCode/verifycode.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "Welcomeinno$10000",
      database: "moee",
      autoLoadEntities: true,
      retryAttempts: 10,
      retryDelay: 3000,
      logger: "file",
      logging: "all",
      cache: true,
      synchronize: true
    }),
    UserModule,
    VerifyCodeModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

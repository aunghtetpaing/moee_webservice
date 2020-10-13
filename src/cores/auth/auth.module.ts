import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrstegy } from "./jwt.strategy";
import { RolesGuard } from "./guards/roles.guard";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { AuthService } from "./auth.service";
import { AuthContoller } from "./auth.controller";
import { UserModule } from '../users/user.module';
import { AppConfig } from "src/config/app.config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [ 
        UserModule,
        PassportModule.register({ 
            defaultStrategy: 'jwt',
            session: true,
        }),
        JwtModule.register({
            secret: AppConfig.jwtSecret,
            signOptions: { expiresIn: 3600 }
        })
    ],
    providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrstegy],
    controllers:[AuthContoller],
    exports: [AuthService]
})

export class AuthModule {}

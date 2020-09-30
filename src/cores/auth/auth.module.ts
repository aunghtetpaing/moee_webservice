import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrstegy } from "../strategies/jwt.strategy";
import { RolesGuard } from "./guards/roles.guard";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { AuthService } from "./auth.service";
import { AuthContoller } from "./auth.controller";
import { UserModule } from '../users/user.module';
import { AppConfig } from "src/config/app.config";

@Module({
    imports: [ 
        UserModule,
        PassportModule.register({ 
            defaultStrategy: 'jwt',
            session: true,
        }),
        JwtModule.register({
            secret: AppConfig.secret,
            signOptions: { expiresIn: 3600 }
        })
    ],
    providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrstegy],
    controllers:[AuthContoller],
    exports: [AuthService]
})

export class AuthModule {}

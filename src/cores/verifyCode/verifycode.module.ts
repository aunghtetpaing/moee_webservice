import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserModule } from "../users/user.module";

import { VerifyCodeService } from "./verifycode.service";
import { VerifyCodeController } from './verifycode.controller';
import { VerifyCodeEntity } from "../../entities/verifycode.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([VerifyCodeEntity]),
        UserModule
    ],
    providers: [VerifyCodeService],
    controllers: [VerifyCodeController],
    exports: [VerifyCodeService]
})

export class VerifyCodeModule {}

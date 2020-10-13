import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../../entities/user.entity";
import { VerifyCodeEntity } from "../../entities/verifycode.entity";
import { HttpResponseService } from "src/services/http.response.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, VerifyCodeEntity])
    ],
    providers: [UserService, HttpResponseService],
    controllers: [UserController],
    exports: [UserService]
})

export class UserModule {}

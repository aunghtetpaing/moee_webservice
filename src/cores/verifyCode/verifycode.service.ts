import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VerifyCodeEntity } from "../../entities/verifycode.entity";
import { Repository } from "typeorm";
import { httpResponseException } from "../../utilites";

@Injectable()
export class VerifyCodeService {

    constructor(
        @InjectRepository(VerifyCodeEntity) private readonly verfiycodeRepo: Repository<VerifyCodeEntity>
    ) {}

    async update(id: number, verifyCode: VerifyCodeEntity): Promise<any> {
        const updated = await this.verfiycodeRepo.update(id, verifyCode);

        if(updated.affected > 0) {
            return verifyCode;
        }
        
        return httpResponseException('055', 'Verify Code Updated Failed');
    }
}
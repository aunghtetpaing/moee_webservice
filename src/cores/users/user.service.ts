import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserEntity } from "../../entities/user.entity";
import { VerifyCodeEntity } from "../../entities/verifycode.entity";
import { CreateUserDto, UpdateUserDto } from "../../dtos/user.dto";
import { httpResponseException, sortObject } from '../../utilites';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>,
        @InjectRepository(VerifyCodeEntity) private readonly verifyRepo: Repository<VerifyCodeEntity>
    ) { }

    async updateByUUID(uuid: string, updateUser: UpdateUserDto): Promise<any> {
        const updated = await this.userRepo.update(uuid, updateUser);
        return updated;
    }

    async updateUserInfo(requestUser: UpdateUserDto): Promise<any> {
        const { email , ...result } = requestUser;
        const isUser: UserEntity = await this.findOneByEmail(email);
    }

    async findOneByEmail(email: string): Promise<any> {
        const getUser: UserEntity = await this.userRepo.findOne({ email });

        if(!getUser) {
            return httpResponseException('004', 'user does not exist!'); 
        }
        return getUser;
    }

    async deleteOne(email: string): Promise<any> {
        const getUser: UserEntity = await this.findOneByEmail(email);
        const { verifycode_ } = getUser;
        const deletedVerifyCode = await this.verifyRepo.delete(verifycode_.id);

        if(deletedVerifyCode.affected > 0 ) {
            return httpResponseException('000', 'user is successfully deleted');
        }

        return httpResponseException('055', 'unable to delete user account');
    }

    async create(requestUser: CreateUserDto): Promise<any> {
        const { phoneNumber } = requestUser;

        if(!Number(phoneNumber)) {
            return httpResponseException('004', 'Phone number must be number format');
        }

        const newUser = this.userRepo.create({ ...requestUser, verifycode_: {} });

        try {
            return await this.userRepo.save(newUser);
        } catch(error) {
            if(error && error.code === 'ER_DUP_ENTRY')
            return httpResponseException('004', 'Email or phone number are already used')
        }
    }

    async getAll(filter?: any): Promise<any> {
        let search: any = {};
        let userGroup: any = {};
        let getUserLists: any = [];
        let pagination: any = {};

        const { skip, take, active, roles } = filter;

        if(active) search.active = eval(active)
        if(roles) search.roles = roles;

        if(skip || take) {
            pagination = { skip: Number(take) * (Number(skip) - 1), take: Number(take) }
        }
    
        const getUser = await this.userRepo.find({
            ...pagination,
            where: { ...search }
        });

        getUser.map((value) => {
            const { verifycode_, ...result } = value;
            delete verifycode_.created_at;
            delete verifycode_.updated_at;
            delete verifycode_.id;
            
            delete result.password;

            userGroup.account = sortObject({ ...result });
            userGroup.verfiyStatus = sortObject({ ...verifycode_ });
            getUserLists.push(userGroup);
        });

        return getUserLists;
    }
    
}
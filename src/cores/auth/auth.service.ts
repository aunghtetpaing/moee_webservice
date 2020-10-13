import * as bcrypt from 'bcryptjs'

import { Injectable } from "@nestjs/common";
import { UserService } from '../users/user.service';

import { AuthCreditentialsDto, AuthTokenDto } from 'src/dtos/auth.dto';
import { UserEntity } from '../../entities/user.entity';
import { httpResponseException } from 'src/utilites';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginType } from 'src/interface/auth.interface';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async useLogin(authCreditentialsDto: AuthCreditentialsDto): Promise<any> {
        const {email, password } = authCreditentialsDto;
        const getUser: UserEntity = await this.userService.findOneByEmail(email);
        const { verifycode_ , ...result } = getUser;

        if(getUser.active === false)
        return httpResponseException('005', 'User is blocked');

        if(verifycode_.is_verify === false)
        return httpResponseException('005', 'user is not verify');

        const valid = await bcrypt.compare(password, getUser.password);

        if(!valid)
        return httpResponseException('006', 'incorrect email or password');

        const accessToken = this.jwtService.sign({
            uuid: getUser.uuid,
            roles: getUser.roles,
            active: getUser.active,
        });

        const authTokenObject: AuthTokenDto = {
            uuid: result.uuid,
            token: accessToken,
        }


        delete result.password;
        delete verifycode_.code;

        return {...result, ...verifycode_, accessToken }
    }
}
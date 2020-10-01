import * as bcrypt from 'bcryptjs'

import { Injectable } from "@nestjs/common";
import { UserService } from '../users/user.service';

import { AuthCreditentialsDto, AuthTokenDto } from 'src/dtos/auth.dto';
import { UserEntity } from '../../entities/user.entity';
import { httpResponseException } from 'src/utilites';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from 'src/entities/token.entity';
import { Repository } from 'typeorm';
import { LoginType } from 'src/interface/auth.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(TokenEntity) private tokenRepo: Repository<TokenEntity>,
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    private async getToken(uuid: string): Promise<any> {
        const isToken = await this.tokenRepo.count({uuid});

        if(isToken === 0)
        return LoginType.FIRST_TIME_LOGIN

        if(isToken > 0)
        return LoginType.NORMAL_LOGIN;
    }

    private async addToken(authToken: AuthTokenDto): Promise<any> {
        const createAuthToken = this.tokenRepo.create(authToken);

        try {
            return await this.tokenRepo.save(createAuthToken);
        } catch(error) {
            return httpResponseException('004', 'Can not Login.')
        }
    }

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

        const loginType = await this.getToken(result.uuid);
        const authTokenObject: AuthTokenDto = {
            uuid: result.uuid,
            token: accessToken,
        }

        this.addToken(authTokenObject);

        delete result.password;
        delete verifycode_.code;

        return {...result, ...verifycode_, loginType, accessToken }
    }
}
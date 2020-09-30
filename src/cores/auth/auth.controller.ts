import { Controller, Post, Body } from "@nestjs/common";

import { AuthService } from "./auth.service";

import { AuthCreditentialsDto } from "../../dtos/auth.dto";
import { httpResponseException, sortObject } from "../../utilites";

@Controller('auth')
export class AuthContoller {

    constructor( 
        private authService: AuthService
    ) {}
    
    @Post()
    async login(@Body() authCreditentialsDto: AuthCreditentialsDto): Promise<any> {
        const getUser = await this.authService.useLogin(authCreditentialsDto);
        
        if(getUser) {
            return httpResponseException('000', 'login successfully', sortObject(getUser));
        }

        return httpResponseException('055', 'services not found');
    }

}
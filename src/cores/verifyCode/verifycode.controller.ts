import { Controller, Post, Body, Put } from '@nestjs/common';

import { httpResponseException } from '../../utilites';

import { VerifyCodeService } from './verifycode.service';
import { UserService } from '../users/user.service';

import { UserEntity } from '../../entities/user.entity';
import { VerifiyCodeDto, ResendCodeDto } from '../../dtos/verifycode.dto';

@Controller('verifyCode')
export class VerifyCodeController {

    errorResponse: any = {};

    constructor(
        private readonly verifycodeService: VerifyCodeService,
        private readonly userService: UserService
    ) { }
    
    @Post()
    async resendCode(@Body() resendCodeDto: ResendCodeDto): Promise<any> {
        const getUser: UserEntity = await this.userService.findOneByEmail(resendCodeDto.email);
        const { resend_times, is_block, id } = getUser.verifycode_;

        if(is_block)
        return httpResponseException('005', 'resend verfiycode process is temporary block');


        if(resend_times < 5) {
            getUser.verifycode_.code = Math.floor(100000 + Math.random() * 900000) + '';
            getUser.verifycode_.is_verify = false;
            getUser.verifycode_.resend_times = resend_times + 1;
            const updateVerifyCode = this.verifycodeService.update(id, getUser.verifycode_);

            if(updateVerifyCode) {
                return httpResponseException('000', 'verifycode is successfully send', {
                    verifyCode: getUser.verifycode_.code
                })
            }
        }

        if(resend_times === 5) {
            getUser.verifycode_.is_block = true;
            const updateVerifyCode = this.verifycodeService.update(id, getUser.verifycode_);

            if(updateVerifyCode){
                return httpResponseException('005', 'resendcode process have been block');
            }
        }
    }

    @Put()
    async verifyCode(@Body() verifycode: VerifiyCodeDto): Promise<any> {

        const { email, verifyCode } = verifycode;
        const user = await this.userService.findOneByEmail(email);

        const { is_verify, attempt,code, id } = user.verifycode_;

        if(is_verify === true) 
        return httpResponseException('004', 'Account is already verified');

        if(attempt === 5)
        return httpResponseException('005', 'Account verification is temporary block');
        
        if(attempt < 5 && verifyCode !== code) {
            user.verifycode_.attempt = attempt + 1;
            const attemptUpdated = await this.verifycodeService.update(id, user.verifycode_);

            if(attemptUpdated)
            return httpResponseException('004', 'Incorrect verifyCode'); 
        }

        if(attempt < 5 && verifyCode === code) {
            user.active = true;
            user.verifycode_.is_verify = true;
            user.verifycode_.is_block = false;
            user.verifycode_.attempt = 0;
            user.verifycode_.resend_times = 0;

            const userUpdated = await this.userService.updateByUUID(user.uuid, user);
            const attemptUpdated = await this.verifycodeService.update(id,user.verifycode_);
           
            if(userUpdated && attemptUpdated) {
                return httpResponseException('000', 'Verification is successfully', {code: user.verifycode_.code});
            }
        }

    }

}
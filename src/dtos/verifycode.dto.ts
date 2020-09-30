import { IsString, Length, IsEmail } from 'class-validator';

export class VerifiyCodeDto {

    @IsEmail() email: string;

    @IsString({ message : 'verifycode is required'})
    @Length(6,6,{message: 'verifycode must be 6 digits'})
    verifyCode: string;
}

export class ResendCodeDto {
    @IsEmail() email: string;
}
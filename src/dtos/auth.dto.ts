
import { IsString, Length, IsEmail, IsUUID, IsEnum } from 'class-validator';
import { LoginType } from 'src/interface/auth.interface';

export class AuthCreditentialsDto {

    @IsString({ message: 'email is required'})
    @IsEmail()
    email: string;

    @IsString({ message: 'password is required' })
    @Length(6,20, { message: 'password must be 6-20 chars' })
    password: string;
}

export class AuthTokenDto {

    @IsString({ message: 'user uuid is required'})
    @IsUUID()
    uuid: string;

    @IsString({ message: 'access token is required'})
    token: string;
}

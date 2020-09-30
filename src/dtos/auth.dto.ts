
import { IsString, Length, IsEmail } from 'class-validator';

export class AuthCreditentialsDto {

    @IsString({ message: 'email is required'})
    @IsEmail()
    email: string;

    @IsString({ message: 'password is required' })
    @Length(6,20, { message: 'password must be 6-20 chars' })
    password: string;
}

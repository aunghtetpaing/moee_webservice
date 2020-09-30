import { IsString, Length, IsEmail, Allow } from 'class-validator';

export class CreateUserDto {

    @IsString({ message: 'username is required'})
    @Length(8,25, { message: 'username must be 8-25 chars'})
    readonly fullName: string;

    @IsString({ message: 'email is required' })
    @IsEmail()
    readonly email: string;

    @IsString()
    @Length(12,12, { message: 'phone number must be 12 digits include 959'})
    readonly phoneNumber: string;

    @IsString({ message: 'password is required' })
    @Length(6,20, { message: 'password must be 6-20 chars' })
    readonly password: string;
}

export class UpdateUserDto {
    @Allow()
    @IsString({ message: 'email is required' })
    @IsEmail()
    readonly email?: string;

    @Allow()
    readonly fullName?: string;

    @Allow()
    readonly phoneNumber?: string;

    @Allow()
    readonly password?: string;
}


export class DeleteUserDto {
    @IsEmail()
    @IsString({ message: 'email is required'})
    readonly email: string;
}

export class userFilterDto {
    readonly active?: boolean;
    readonly roles?: string;
    readonly take?: number;
    readonly skip?: number;
}
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email : string

    @IsString()
    password: string
}

export class roleDTO {
    @IsNotEmpty()
    id: string;
}
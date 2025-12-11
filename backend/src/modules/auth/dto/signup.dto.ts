import { IsEmail, isNotEmpty, IsNotEmpty, IsNumber, IsString, Length, Matches, MinLength } from "class-validator";

export class SignupUserDTO {
    @IsNotEmpty({message:"name is required"})
    @IsString()
    name: string;

    @IsNotEmpty({message:"email is required"})
    @IsEmail({},{message:"invalid email"})
    email: string;

    @IsNotEmpty({message:"password is required"})
    @IsString()
    @MinLength(8,{message:"password must be atleast 8 characters long"})
    password: string;

    @IsNotEmpty({message:"phone number is required"})
    @IsString()
    @Matches(/[0-9]{10}/,{message: "Phone number can only contains 10 digits"})
    phoneNumber: string;

    @IsNotEmpty({message:"address is required"})
    @IsString()
    address: string;
}
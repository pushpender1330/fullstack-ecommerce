import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthServices } from "./auth.service";
import { SignupUserDTO } from "./dto/signup.dto";
import { LoginUserDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController{

    constructor(private authServices: AuthServices){}
    
    @Post('signup')
    createAccount(@Body() CreateUserDTO: SignupUserDTO){
        return this.authServices.createUser(CreateUserDTO);
    }

    @Post('login')
    login(@Body() loginDTO: LoginUserDto){
        return this.authServices.login(loginDTO);
    }
}
import { Body, Controller, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthServices } from "./auth.service";
import { SignupUserDTO } from "./dto/signup.dto";
import { LoginUserDto, roleDTO } from "./dto/login.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { AdminGuard } from "src/guards/admin.guard";

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

    @UseGuards(AuthGuard,AdminGuard)
    @Get('users')
    getAllUser(){
        return this.authServices.getAllUser();
    }

    @UseGuards(AuthGuard,AdminGuard)
    @Patch('change-role')
    toggleUserRole(@Body() roleBody: roleDTO){
        return this.authServices.toggleUserRole({userId: roleBody.id});
    }
}
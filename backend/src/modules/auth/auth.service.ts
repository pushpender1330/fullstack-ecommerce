import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/typeorm/entities/User";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthServices{

    constructor(@InjectRepository(User) private userRepo: Repository<User>, private jwtService: JwtService){}

    saltOrRounds = 12;

    async createUser(newUser: createUserInterface){
        try{
            const {email,password,phoneNumber} = newUser;

            const user = await this.userRepo.findOne({where : [{email},{phoneNumber}]});

            if(user){
                throw new ConflictException('User already exist with this email or phone');
            }

            const hashPassword = await bcrypt.hash(password, this.saltOrRounds);

            const hashedUser = this.userRepo.create({
                ...newUser,
                password : hashPassword,
            })

            await this.userRepo.save(hashedUser);
            return {
                message: "user created"
            }
        }
        catch(err){
            if(err.status){
                throw err;
            }
            throw new InternalServerErrorException();
        }
    }
    
    async login(loginDetail: loginInterface){
        try{
            const {email,password} = loginDetail;
            const user = await this.userRepo.findOne({where: {email}});

            if(!user){
                throw new UnauthorizedException('Invalid credentials');
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if(!isPasswordMatch){
                throw new UnauthorizedException('Invalid credentials');
            }

            const token = await this.jwtService.signAsync({
                userId: user.id,
                userName: user.name,
                userEmail: user.email,
                role: user.role,
            })


            return {
                message : "login success",
                token,
                role: user?.role,
                name: user?.name,
            };
        }
        catch(err){
            if(err.status){
                throw err;
            }
            throw new InternalServerErrorException();
        }
    }

    async getAllUser(){
        try{
            const users = await this.userRepo.find({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phoneNumber: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                    address: true,
                    password: false,
                }
            });
            return {
                users,
                message: 'success'
            }
        }
        catch(err){
            throw err
        }
    }

    async getUserById(id: string){
        try{
            const user = await this.userRepo.findOne({
                where:{
                    id
                }
            });
            return user;
        }
        catch(err){
            throw err
        }
    }

    async toggleUserRole({userId}){
        try{
            const user = await this.userRepo.findOne({
                where:{
                    id: userId
                }
            })


            if(!user){
                throw new NotFoundException('User not found');
            }

            if(user.email === 'pp@gg.in'){
                throw new BadRequestException('you cannot change this user role');
            }

            if(user.role == 'ADMIN'){
                user.role = 'USER';
            }
            else{
                user.role = 'ADMIN'
            }
            await this.userRepo.save(user);
            return {
                message: "success",
                user
            }
            
        }
        catch(err){
            throw err;
        }
    }
}
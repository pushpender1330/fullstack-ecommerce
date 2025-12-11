import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthServices } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/typeorm/entities/User";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([User]),JwtModule.register({
      global: true,
      secret: "vscode",
    })],
    controllers: [AuthController],
    providers: [AuthServices]
})
export class AuthModule {

}
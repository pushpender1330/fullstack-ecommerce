import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if(!user){
        throw new UnauthorizedException('user not found')
    }

    if(user.role !== 'ADMIN'){
        throw new ForbiddenException('you are not authorized as admin')
    }

    return true;
  }
    
}
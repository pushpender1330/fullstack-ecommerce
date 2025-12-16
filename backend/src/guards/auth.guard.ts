
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthServices } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,private config: ConfigService,
    private userService: AuthServices
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.config.get('JWT_SECRET')
        }
      );
      request['user'] = payload;

      const user = await this.userService.getUserById(payload?.userId);
      console.log({user,payload})

      if (!user || payload.role !== user.role) {
        throw new ForbiddenException('Token expired');
      }
    } catch(err) {
      throw err;
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

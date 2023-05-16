import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        req.user = decoded;

        return true;
      } catch (err) {
        // Handle token validation error
        throw new HttpException('Access deniend ', HttpStatus.UNAUTHORIZED);
      }
    }

    // No token found or invalid token
    return false;
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Role } from 'src/enums/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const authHeader = request.headers['authorization'];

    if (!authHeader || typeof authHeader !== 'string') return false;

    const token = authHeader.split(' ')[1];

    if (!token) return false;

    const secret = process.env.JWT_SECRET;

    try {
      const user = this.jwtService.verify(token, { secret });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (user.isAdmin) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        user.roles = [Role.Admin];
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        user.roles = [Role.User];
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      user.iat = new Date(user.iat * 1000);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      user.exp = new Date(user.exp * 1000);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      request.user = user;

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

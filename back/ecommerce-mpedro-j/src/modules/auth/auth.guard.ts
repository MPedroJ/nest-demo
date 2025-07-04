import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || typeof authHeader !== 'string')
      throw new Error('No authorization header');

    const [type, credentials] = authHeader.split(': ');

    if (type !== 'Basic' || !credentials || !credentials.includes(':'))
      throw new Error('Invalid authorization header');

    const [email, password] = authHeader.split(':');

    if (!email || !password) throw new Error('MIssing credentials');

    return true;
  }
}

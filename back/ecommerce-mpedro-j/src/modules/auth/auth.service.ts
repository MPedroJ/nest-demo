import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getAuth() {
    return { message: 'Auth service is working' };
  }
}

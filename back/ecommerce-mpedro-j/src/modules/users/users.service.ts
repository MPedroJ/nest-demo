import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getUsers() {
    return { message: 'User service is working' };
  }
}

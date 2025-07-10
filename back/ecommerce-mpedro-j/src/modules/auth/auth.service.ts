import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { Users } from 'src/entities/Users.entity';
import { LoginDTO } from 'src/DTO/userDTO';

@Injectable()
export class AuthService {
  constructor(private userRepository: UsersRepository) {}
  getAuth() {
    return { message: 'Auth service is working' };
  }

  signInService(request: LoginDTO): Promise<Users> {
    return this.userRepository.singInRepository(request);
  }
}

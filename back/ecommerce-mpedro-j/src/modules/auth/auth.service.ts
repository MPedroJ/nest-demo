import { Injectable } from '@nestjs/common';
import { ISignInDTO } from 'src/DTO/authDTO';
import { UsersRepository } from '../users/users.repository';
import { Users } from 'src/entities/Users.entity';

@Injectable()
export class AuthService {
  constructor(private userRepository: UsersRepository) {}
  getAuth() {
    return { message: 'Auth service is working' };
  }

  signInService(request: ISignInDTO): Promise<Users> {
    return this.userRepository.singInRepository(request);
  }
}

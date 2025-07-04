import { Injectable } from '@nestjs/common';
import { ISignInDTO } from 'src/DTO/authDTO';
import { UsersRepository } from '../users/users.repository';
import { IUserResponseDTO } from 'src/DTO/userDTO';

@Injectable()
export class AuthService {
  constructor(private userRepository: UsersRepository) {}
  getAuth() {
    return { message: 'Auth service is working' };
  }

  signInService(request: ISignInDTO): IUserResponseDTO {
    return this.userRepository.singInRepository(request);
  }
}

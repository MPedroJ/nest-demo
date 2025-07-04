import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import {
  INewUserDTO,
  IPaginatedUsers,
  IUserResponseDTO,
} from 'src/DTO/userDTO';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsersService(pageNumber: number, limitNumber: number): IPaginatedUsers {
    const usersArray: IUserResponseDTO[] = this.usersRepository.findAll();

    const start = (pageNumber - 1) * limitNumber;
    const end = start + limitNumber;
    const filteredUsers = usersArray.slice(start, end);

    const totalPages = Math.ceil(usersArray.length / limitNumber);

    return {
      data: filteredUsers,
      total: usersArray.length,
      page: pageNumber,
      limit: limitNumber,
      totalPages: totalPages,
    };
  }

  getUserByIdService(id: number): IUserResponseDTO {
    return this.usersRepository.findById(Number(id));
  }

  createUserService(newUserInfo: INewUserDTO): IUserResponseDTO {
    return this.usersRepository.createUserRepository(newUserInfo);
  }

  updateUserService(id: number): number {
    return this.usersRepository.updateUserRepository(id);
  }

  deleteUserService(id: number): number {
    return this.usersRepository.deleteUserRepository(id);
  }
}

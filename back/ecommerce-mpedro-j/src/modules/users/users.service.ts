import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { INewUserDTO, IPaginatedUsers } from 'src/DTO/userDTO';
import { Users } from 'src/entities/Users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsersService(
    pageNumber: number,
    limitNumber: number,
  ): Promise<IPaginatedUsers> {
    const usersArray: Users[] = await this.usersRepository.findAll();

    if (!usersArray.length) {
      throw new NotFoundException('No se encontraron usuarios');
    }

    const start = (pageNumber - 1) * limitNumber;
    const end = start + limitNumber;
    const filteredUsers = usersArray.slice(start, end);
    console.log(filteredUsers);

    const totalPages = Math.ceil(usersArray.length / limitNumber);

    return {
      data: filteredUsers,
      total: usersArray.length,
      page: pageNumber,
      limit: limitNumber,
      totalPages: totalPages,
    };
  }

  getUserByIdService(id: string): Promise<Users> {
    return this.usersRepository.findById(id);
  }

  createUserService(newUserInfo: INewUserDTO): Promise<string> {
    return this.usersRepository.createUserRepository(newUserInfo);
  }

  updateUserService(id: string, newInfoUser: Partial<Users>): Promise<string> {
    return this.usersRepository.updateUserRepository(id, newInfoUser);
  }

  deleteUserService(id: string): Promise<string> {
    return this.usersRepository.deleteUserRepository(id);
  }
}

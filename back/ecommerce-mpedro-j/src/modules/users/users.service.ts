import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from 'src/entities/Users.entity';
import { PaginatedUsersDTO } from 'src/DTO/UsersDTOs/paginatedUsers.dto';
import { UserIdDTO } from 'src/DTO/UsersDTOs/userId.dto';
import { UserResponseDTO } from 'src/DTO/UsersDTOs/userResponse.dto';
import { UpdateUserDTO } from 'src/DTO/UsersDTOs/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsersService(
    pageNumber?: number,
    limitNumber?: number,
  ): Promise<PaginatedUsersDTO> {
    const validPage = pageNumber && pageNumber > 0 ? pageNumber : 1;
    const validLimit = limitNumber && limitNumber > 0 ? limitNumber : 5;

    const usersArray: Users[] = await this.usersRepository.findAll();

    if (!usersArray.length) {
      throw new NotFoundException('No se encontraron usuarios');
    }

    const start = (validPage - 1) * validLimit;
    const end = start + validLimit;
    const filteredUsers = usersArray.slice(start, end);

    const totalPages = Math.ceil(usersArray.length / validLimit);

    return {
      data: filteredUsers,
      total: usersArray.length,
      page: validPage,
      limit: validLimit,
      totalPages: totalPages,
    };
  }

  getUserByIdService(id: string): Promise<UserResponseDTO> {
    return this.usersRepository.findById(id);
  }

  updateUserService(
    id: string,
    newInfoUser: UpdateUserDTO,
  ): Promise<UserResponseDTO | null> {
    return this.usersRepository.updateUserRepository(id, newInfoUser);
  }

  deleteUserService(id: string): Promise<UserIdDTO> {
    return this.usersRepository.deleteUserRepository(id);
  }
}

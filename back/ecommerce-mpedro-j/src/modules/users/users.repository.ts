import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDTO } from 'src/DTO/UsersDTOs/updateUser.dto';
import { UserIdDTO } from 'src/DTO/UsersDTOs/userId.dto';
import { UserResponseDTO } from 'src/DTO/UsersDTOs/userResponse.dto';
import { Users } from 'src/entities/Users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findById(id: string): Promise<UserResponseDTO> {
    const user: Users | null = await this.usersRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        orders: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUserRepository(
    id: string,
    newInfoUser: UpdateUserDTO,
  ): Promise<Users | null> {
    await this.usersRepository.update(id, newInfoUser);

    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });

    return user;
  }

  async deleteUserRepository(id: string): Promise<UserIdDTO> {
    await this.usersRepository.delete(id);

    return { id };
  }
}

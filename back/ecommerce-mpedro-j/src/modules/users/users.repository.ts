import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ISignInDTO } from 'src/DTO/authDTO';
import { INewUserDTO } from 'src/DTO/userDTO';
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

  async findById(id: string): Promise<Users> {
    const user: Users | null = await this.usersRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        orders: true,
      },
    });
    if (!user) throw new Error('User not found');
    return user;
  }

  async createUserRepository(newUserInfo: INewUserDTO): Promise<string> {
    const existingUser: Users | null = await this.usersRepository.findOne({
      where: {
        email: newUserInfo.email,
      },
    });
    if (existingUser) throw new Error('User already exists');

    const newUser: Users = this.usersRepository.create(newUserInfo);
    const savedUser: Users = await this.usersRepository.save(newUser);
    return savedUser.id;
  }

  async updateUserRepository(
    id: string,
    newInfoUser: Partial<Users>,
  ): Promise<string> {
    await this.usersRepository.update(id, newInfoUser);

    return id;
  }

  async deleteUserRepository(id: string): Promise<string> {
    await this.usersRepository.delete(id);

    return id;
  }

  async singInRepository(request: ISignInDTO): Promise<Users> {
    const user: Users | null = await this.usersRepository.findOne({
      where: {
        email: request.email,
      },
    });
    if (!user) throw new Error('User not found');
    if (user.password !== request.password)
      throw new Error('Email or password incorrect');

    return user;
  }
}

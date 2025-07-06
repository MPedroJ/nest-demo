import { Injectable } from '@nestjs/common';
import { ISignInDTO } from 'src/DTO/authDTO';
import { INewUserDTO, IUserResponseDTO } from 'src/DTO/userDTO';
import { IUser } from 'src/interface/User';

@Injectable()
export class UsersRepository {
  private users: IUser[] = [
    {
      id: 1,
      email: 'user1@example.com',
      name: 'John Doe',
      password: '1234',
      address: 'Main Street 123',
      phone: '123456789',
      country: 'Argentina',
      city: 'Buenos Aires',
    },
    {
      id: 2,
      email: 'user2@example.com',
      name: 'Jane Smith',
      password: 'abcd',
      address: 'Second Ave 456',
      phone: '987654321',
    },
    {
      id: 3,
      email: 'user3@example.com',
      name: 'Bob Johnson',
      password: 'efgh',
      address: 'Third St 789',
      phone: '123456789',
    },
    {
      id: 4,
      email: 'user4@example.com',
      name: 'Alice Brown',
      password: 'ijkl',
      address: 'Fourth Ave 123',
      phone: '987654321',
    },
    {
      id: 5,
      email: 'user5@example.com',
      name: 'Charlie Davis',
      password: 'mnop',
      address: 'Fifth St 321',
      phone: '123456789',
    },
    {
      id: 6,
      email: 'user6@example.com',
      name: 'Eve Miller',
      password: 'qrst',
      address: 'Sixth Ave 456',
      phone: '987654321',
      country: 'Mexico',
      city: 'Mexico City',
    },
    {
      id: 7,
      email: 'user7@example.com',
      name: 'Frank Williams',
      password: 'uvwx',
      address: 'Seventh St 789',
      phone: '123456789',
      country: 'Brazil',
      city: 'Rio de Janeiro',
    },
    {
      id: 8,
      email: 'user8@example.com',
      name: 'George Thomas',
      password: 'yzab',
      address: 'Eighth Ave 123',
      phone: '987654321',
      country: 'Australia',
      city: 'Sydney',
    },
    {
      id: 9,
      email: 'user9@example.com',
      name: 'Henry Lee',
      password: 'zxcv',
      address: 'Ninth St 321',
      phone: '123456789',
      country: 'United States',
      city: 'New York',
    },
    {
      id: 10,
      email: 'user10@example.com',
      name: 'Jane Brown',
      password: '1234',
      address: 'Tenth Ave 456',
      phone: '987654321',
      country: 'United States',
      city: 'Los Angeles',
    },
  ];

  findAll(): IUserResponseDTO[] {
    const users = this.users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      phone: user.phone,
      country: user.country,
      city: user.city,
    }));
    return users;
  }

  findById(id: number): IUserResponseDTO {
    const user: IUser | undefined = this.users.find((user) => user.id === id);

    if (!user) throw new Error('User not found');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  createUserRepository(newUserInfo: INewUserDTO): IUserResponseDTO {
    const newUser: IUser = {
      id: this.users[this.users.length - 1].id + 1,
      ...newUserInfo,
    };

    this.users.push(newUser);

    return newUser;
  }

  updateUserRepository(
    id: number,
    newInfoUser: Partial<IUser>,
  ): number | undefined {
    const index: number | undefined = this.users.findIndex(
      (user) => user.id === id,
    );

    if (!index) {
      throw new Error('User not found');
    }

    this.users[index] = newInfoUser as IUser;

    return newInfoUser.id;
  }

  deleteUserRepository(id: number): number {
    const newUserArray: IUser[] = this.users.filter((user) => user.id !== id);

    this.users = newUserArray;

    return id;
  }

  singInRepository(request: ISignInDTO): IUserResponseDTO {
    const user = this.users.find((user) => user.email === request.email);
    console.log(user);
    if (!user || user.password !== request.password)
      throw new Error('User or password incorrect');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    console.log(userWithoutPassword);
    return userWithoutPassword;
  }
}

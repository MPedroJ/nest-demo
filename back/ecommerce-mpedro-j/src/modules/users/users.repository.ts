import { Injectable } from '@nestjs/common';
import { User } from 'src/interface/User';

@Injectable()
export class UsersRepository {
  private users: User[] = [
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
  ];

  findAll() {
    return this.users;
  }
}

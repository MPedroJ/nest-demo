import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users.entity';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const mockUsersRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('Creates an instance of AuthService', () => {
    expect(authService).toBeDefined();
  });
});

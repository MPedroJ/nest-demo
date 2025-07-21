import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../../entities/Users.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: jest.Mocked<Repository<Users>>;

  beforeEach(async () => {
    const mockRepo = {
      find: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockRepo,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should return paginated users correctly', async () => {
    const mockUsers = Array(10).fill({
      id: 'uuid',
      name: 'John',
      password: 'secret',
    });

    usersRepository.find.mockResolvedValue(mockUsers);

    const result = await usersService.getUsersService(1, 5);

    expect(result.data.length).toBe(5);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(5);
    expect(result.total).toBe(10);
    expect(result.totalPages).toBe(2);
  });
});

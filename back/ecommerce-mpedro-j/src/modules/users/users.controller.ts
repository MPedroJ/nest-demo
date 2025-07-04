import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  INewUserDTO,
  IPaginatedUsers,
  IUserResponseDTO,
} from 'src/DTO/userDTO';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  getUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ): IPaginatedUsers {
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    return this.usersService.getUsersService(pageNumber, limitNumber);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  getUserById(@Param('id') id: number): IUserResponseDTO {
    return this.usersService.getUserByIdService(id);
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() request: INewUserDTO): IUserResponseDTO {
    return this.usersService.createUserService(request);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  updateUser(@Param('id') id: number): number {
    return this.usersService.updateUserService(Number(id));
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  deleteUser(@Param('id') id: number): number {
    return this.usersService.deleteUserService(Number(id));
  }
}

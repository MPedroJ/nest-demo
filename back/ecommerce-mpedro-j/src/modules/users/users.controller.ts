import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { INewUserDTO, IPaginatedUsers } from 'src/DTO/userDTO';
import { AuthGuard } from '../auth/auth.guard';
import { Users } from 'src/entities/Users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ): Promise<IPaginatedUsers> {
    return this.usersService.getUsersService(+page, +limit);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<Users> {
    return this.usersService.getUserByIdService(id);
  }

  @Post()
  createUser(@Body() request: INewUserDTO): Promise<string> {
    return this.usersService.createUserService(request);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: Partial<Users>,
  ): Promise<string> {
    return this.usersService.updateUserService(id, request);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.usersService.deleteUserService(id);
  }
}

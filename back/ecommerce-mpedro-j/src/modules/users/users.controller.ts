import {
  Body,
  Controller,
  Delete,
  Get,
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
import { IUser } from 'src/interface/User';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ): IPaginatedUsers {
    return this.usersService.getUsersService(+page, +limit);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param('id') id: number): IUserResponseDTO {
    return this.usersService.getUserByIdService(id);
  }

  @Post()
  createUser(@Body() request: INewUserDTO): IUserResponseDTO {
    return this.usersService.createUserService(request);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id') id: number,
    @Body() request: Partial<IUser>,
  ): number | undefined {
    return this.usersService.updateUserService(Number(id), request);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: number): number {
    return this.usersService.deleteUserService(Number(id));
  }
}

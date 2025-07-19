import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { ExcludePasswordInterceptor } from 'src/interceptors/excludePassword.interceptor';
import { Role } from 'src/enums/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/role.guard';
import { PaginatedUsersDTO } from 'src/DTO/UsersDTOs/paginatedUsers.dto';
import { UserIdDTO } from 'src/DTO/UsersDTOs/userId.dto';
import { UserResponseDTO } from 'src/DTO/UsersDTOs/userResponse.dto';
import { UpdateUserDTO } from 'src/DTO/UsersDTOs/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  @UseInterceptors(ExcludePasswordInterceptor)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<PaginatedUsersDTO> {
    return this.usersService.getUsersService(page, limit);
  }

  @Get(':id')
  @UseInterceptors(ExcludePasswordInterceptor)
  @UseGuards(AuthGuard)
  getUserById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserResponseDTO> {
    return this.usersService.getUserByIdService(id);
  }

  @Put(':id')
  @UseInterceptors(ExcludePasswordInterceptor)
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: UpdateUserDTO,
  ): Promise<UserResponseDTO | null> {
    return this.usersService.updateUserService(id, request);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserIdDTO> {
    return this.usersService.deleteUserService(id);
  }
}

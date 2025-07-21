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
import {
  CreateAndUpdateUserResponseDTO,
  UserResponseDTO,
} from 'src/DTO/UsersDTOs/userResponse.dto';
import { UpdateUserDTO } from 'src/DTO/UsersDTOs/updateUser.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiOperation({
    summary: 'This is to get all the registered users (Admin only)',
  })
  @ApiBearerAuth()
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
  @ApiOperation({
    summary: 'This is to get only one user by Id (You need to be logged in)',
  })
  @ApiBearerAuth()
  @UseInterceptors(ExcludePasswordInterceptor)
  @UseGuards(AuthGuard)
  getUserById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserResponseDTO> {
    return this.usersService.getUserByIdService(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'This is to update an user (You need to be logged in)',
  })
  @ApiBearerAuth()
  @UseInterceptors(ExcludePasswordInterceptor)
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() request: UpdateUserDTO,
  ): Promise<CreateAndUpdateUserResponseDTO | null> {
    return this.usersService.updateUserService(id, request);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'This is to delete an user (You need to be logged in)',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserIdDTO> {
    return this.usersService.deleteUserService(id);
  }
}

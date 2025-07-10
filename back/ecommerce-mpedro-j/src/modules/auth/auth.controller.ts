import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'src/entities/Users.entity';
import { LoginDTO } from 'src/DTO/userDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('signin')
  @HttpCode(200)
  signIn(@Body() request: LoginDTO): Promise<Users> {
    return this.authService.signInService(request);
  }
}

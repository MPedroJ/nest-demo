import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ISignInDTO } from 'src/DTO/authDTO';
import { Users } from 'src/entities/Users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('signin')
  @HttpCode(200)
  signIn(@Body() request: ISignInDTO): Promise<Users> {
    return this.authService.signInService(request);
  }
}

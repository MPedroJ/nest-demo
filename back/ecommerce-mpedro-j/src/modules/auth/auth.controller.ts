import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ISignInDTO } from 'src/DTO/authDTO';
import { IUserResponseDTO } from 'src/DTO/userDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('signin')
  @HttpCode(200)
  signIn(@Body() request: ISignInDTO): IUserResponseDTO {
    return this.authService.signInService(request);
  }
}

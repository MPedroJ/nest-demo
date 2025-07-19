import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ExcludePasswordInterceptor } from 'src/interceptors/excludePassword.interceptor';
import { SignUpDTO } from 'src/DTO/AuthDTOs/singUp.dto';
import { LoginDTO } from 'src/DTO/AuthDTOs/signIn.dto';
import { UserResponseDTO } from 'src/DTO/UsersDTOs/userResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('signup')
  @UseInterceptors(ExcludePasswordInterceptor)
  singUp(@Body() request: SignUpDTO): Promise<UserResponseDTO> {
    return this.authService.signUpService(request);
  }

  @Post('signin')
  signIn(@Body() request: LoginDTO) {
    return this.authService.signInService(request);
  }
}

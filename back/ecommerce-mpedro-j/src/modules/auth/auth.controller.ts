import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ExcludePasswordInterceptor } from 'src/interceptors/excludePassword.interceptor';
import { SignUpDTO } from 'src/DTO/AuthDTOs/singUp.dto';
import { LoginDTO } from 'src/DTO/AuthDTOs/signIn.dto';
import { CreateAndUpdateUserResponseDTO } from 'src/DTO/UsersDTOs/userResponse.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInResponseDTO } from 'src/DTO/AuthDTOs/signInResponse.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'This is to register an user' })
  @UseInterceptors(ExcludePasswordInterceptor)
  singUp(@Body() request: SignUpDTO): Promise<CreateAndUpdateUserResponseDTO> {
    return this.authService.signUpService(request);
  }

  @Post('signin')
  @ApiOperation({ summary: 'This is to login' })
  signIn(@Body() request: LoginDTO): Promise<SignInResponseDTO> {
    return this.authService.signInService(request);
  }
}

import { PickType } from '@nestjs/swagger';
import { SignUpDTO } from './singUp.dto';

export class LoginDTO extends PickType(SignUpDTO, ['email', 'password']) {}

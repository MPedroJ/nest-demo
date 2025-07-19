import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/helpers/matchPassword';

export class SignUpDTO {
  @ApiProperty({
    example: 'pedro@mail.com',
    description: 'Email to register',
  })
  @IsEmail({}, { message: 'The email must have a proper format' })
  email: string;

  @ApiProperty({
    example: 'Pedro',
    description: 'Name of the user',
  })
  @IsString({ message: 'The name must ba an string' })
  @Length(3, 50, {
    message: 'The length of the name must be between 3 and 50 characters',
  })
  name: string;

  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'Secure password to keep your privacy',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
  })
  @Length(8, 15, {
    message: 'The length of the password must be  between 8 and 15 characters',
  })
  password: string;

  @ApiProperty({
    description: 'Repeat your password',
  })
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  @ApiProperty({
    example: 'Calle Falsa 123',
    description: 'Address of the user',
  })
  @Length(3, 80, {
    message: 'The length of the address must be between 3 and 80 characters',
  })
  address: string;

  @ApiProperty({
    example: '123456789',
    description: 'Phone number of the user',
  })
  @IsNumber({}, { message: 'The phone must be only numbers' })
  phone: number;

  @ApiPropertyOptional({
    example: 'Argentina',
    description: 'The country of the user',
  })
  @IsString({ message: 'The country must be an string' })
  @Length(5, 50, {
    message: 'The country must have between 5 and 50 characters',
  })
  country?: string;

  @ApiPropertyOptional({
    example: 'Belen de Escobar',
    description: 'The city of the user',
  })
  @IsString({ message: 'The city must be an string' })
  @Length(5, 50, { message: 'The city must have between 5 and 50 characters' })
  city?: string;

  @ApiProperty({
    example: false,
    description: 'Admin control is in default false when creating a new user',
  })
  isAdmin: boolean;
}

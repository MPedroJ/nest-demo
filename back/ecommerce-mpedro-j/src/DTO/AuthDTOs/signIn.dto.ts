import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    example: 'pedro@mail.com',
    description: 'Email of the user that wants to login',
  })
  @IsEmail({}, { message: 'The email must have a valid format' })
  email: string;

  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'Password of the user that wants to login',
  })
  @IsString({ message: 'The password must be an string' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
  })
  @Length(8, 100, {
    message: 'The length of the password must be  between 8 and 100 characters',
  })
  password: string;
}

import {
  IsOptional,
  IsString,
  IsEmail,
  IsBoolean,
  IsNumber,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDTO {
  @ApiPropertyOptional({ example: 'Juan PÃ©rez' })
  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  @Length(3, 50, {
    message: 'Name must be between 3 and 80 characters.',
  })
  name?: string;

  @ApiPropertyOptional({ example: 'juan@example.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Email must be valid.' })
  @MaxLength(50, { message: 'Email must have a max of 50 characters' })
  email?: string;

  @ApiPropertyOptional({ example: 'Secure123!' })
  @IsOptional()
  @IsString({ message: 'Password must be a string.' })
  @Length(8, 100, {
    message: 'Password must be between 8 and 100 characters.',
  })
  password?: string;

  @ApiPropertyOptional({ example: 1122334455 })
  @IsOptional()
  @IsNumber({}, { message: 'Phone must be a number.' })
  phone?: number;

  @ApiPropertyOptional({ example: 'Argentina' })
  @IsOptional()
  @IsString({ message: 'Country must be a string.' })
  @Length(5, 50, {
    message: 'Country must be between 5 and 50 characters.',
  })
  country?: string;

  @ApiPropertyOptional({ example: 'Buenos Aires' })
  @IsOptional()
  @IsString({ message: 'City must be a string.' })
  @Length(5, 50, {
    message: 'City must be between 5 and 50 characters.',
  })
  city?: string;

  @ApiPropertyOptional({ example: 'Calle Falsa 123' })
  @IsOptional()
  @IsString({ message: 'Address must be a string.' })
  @Length(3, 80, {
    message: 'Address must be between 3 and 80 characters.',
  })
  address?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean({ message: 'The value must be true or false.' })
  isAdmin?: boolean;
}

import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDTO {
  @ApiProperty({ example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab' })
  @IsString({ message: 'The ID must be an string.' })
  id: string;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString({ message: 'The Name must be an string.' })
  name: string;

  @ApiProperty({ example: 'juan@example.com' })
  @IsEmail({}, { message: 'The email, must havea valid format.' })
  email: string;

  @ApiProperty({ example: 1122334455 })
  @IsNumber({}, { message: 'The phone must be a number.' })
  phone: number;

  @ApiPropertyOptional({ example: 'Argentina' })
  @IsOptional()
  @IsString({ message: 'Thhe country must be a string.' })
  country?: string;

  @ApiPropertyOptional({ example: 'Buenos Aires' })
  @IsOptional()
  @IsString({ message: 'The city must be a string' })
  city?: string;

  @ApiProperty({ example: 'Calle Falsa 123' })
  @IsString({ message: 'The address must be an string.' })
  address: string;
}

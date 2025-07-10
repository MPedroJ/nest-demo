import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PickType } from '@nestjs/mapped-types';

export class INewUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
  })
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country?: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class LoginDTO extends PickType(INewUserDTO, ['email', 'password']) {}

export interface IUserResponseDTO {
  id: string;
  email: string;
  name: string;
  address: string;
  phone: number;
  country?: string;
  city?: string;
}

export interface IPaginatedUsers {
  data: IUserResponseDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  Min,
} from 'class-validator';
// import { Categories } from 'src/entities/Categories.entity';

export class NewProductDTO {
  @ApiProperty({
    example: 'Smartphone 12',
    description: 'Name of the product',
  })
  @IsNotEmpty({ message: 'This camp is obligatory' })
  @IsString({ message: 'Name must be a string' })
  @MaxLength(50, { message: 'It must have a max length  of  50 characters' })
  name: string;

  @ApiProperty({
    example: 'This phone  is great',
    description: 'Description of the product',
  })
  @IsNotEmpty({ message: 'This camp is obligatory' })
  @IsString({ message: 'Description must be a string' })
  @Length(10, 255, {
    message: 'Description must  be between  10 and 255 characters',
  })
  description: string;

  @ApiProperty({
    example: 10,
    description: 'Price of the product',
  })
  @IsNotEmpty({ message: 'This camp is obligatory' })
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0.01, { message: 'Price must be greater than 0' })
  price: number;

  @ApiPropertyOptional({
    example: 'image.jpg',
    description: 'Url  of the image for the product',
  })
  @IsOptional()
  @IsString({ message: 'Image must be an URL(string)' })
  image?: string;

  @ApiProperty({
    example: 10,
    description: 'Initial stock of the product',
  })
  @IsNotEmpty({ message: 'This camp is obligatory' })
  @IsNumber({}, { message: 'stock  must be a number' })
  @Min(0, { message: 'stock  cannot be negative' })
  stock: number;

  @ApiProperty({
    example: 'de3a3cd2-6a10-4f19-95c0-3bc89d9e318e',
    description: 'UUID of the category you want to assign to the product',
  })
  @IsNotEmpty({ message: 'This camp is obligatory' })
  @IsString({ message: 'Category must be the id of the category selected' })
  category: string;
}

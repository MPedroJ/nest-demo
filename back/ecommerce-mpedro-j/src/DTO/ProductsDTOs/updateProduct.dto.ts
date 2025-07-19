import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length, IsNumber, Min } from 'class-validator';

export class UpdateProductDTO {
  @ApiPropertyOptional({
    example: 'Smartphone 13',
    description: 'String to  change the name of the product',
  })
  @IsOptional()
  @IsString({ message: 'Name must be a string.' })
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters.' })
  name?: string;

  @ApiPropertyOptional({
    example: 'Fastest phone in the world',
    description: 'String to change the descrition of the product',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string.' })
  @Length(10, 255, {
    message: 'Description must be between 10 and 255 characters.',
  })
  description?: string;

  @ApiPropertyOptional({
    example: 13,
    description: 'Number to change the price of the product',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number.' })
  @Min(0.01, { message: 'Price must be greater than 0.' })
  price?: number;

  @ApiPropertyOptional({
    example: 13,
    description: 'Number to change the stock of the product',
  })
  @IsOptional()
  @IsNumber({}, { message: 'Stock must be a number.' })
  @Min(0, { message: 'Stock cannot be negative.' })
  stock?: number;

  @ApiPropertyOptional({
    example: 'photo.webp',
    description: 'String to change the image of the product',
  })
  @IsOptional()
  @IsString({ message: 'Image URL must be a string.' })
  imgUrl?: string;
}

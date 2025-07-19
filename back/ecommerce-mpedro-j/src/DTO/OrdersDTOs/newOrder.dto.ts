import {
  IsUUID,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsInt,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductOrderDto {
  @ApiProperty({
    example: 'a3f4f250-8c4e-4b21-a9f3-bbcd12345678',
    description: 'UUID of the product to add to the order.',
  })
  @IsUUID('4', { message: 'Product id must be a valid UUID.' })
  id: string;

  @ApiProperty({
    example: 2,
    description: 'Number of units of the product.',
  })
  @IsInt({ message: 'Quantity must be an integer.' })
  @Min(1, { message: 'Minimum quantity is 1.' })
  quantity: number;
}

export class CreateOrderDTO {
  @ApiProperty({
    example: 'e7b0f30c-5e26-4c78-abc5-f103564e91f1',
    description: 'UUID of the user placing the order.',
  })
  @IsUUID('4', { message: 'userId must be a valid UUID.' })
  @IsNotEmpty({ message: 'userId cannot be empty.' })
  user: string;

  @ApiProperty({
    description: 'List of products to order with quantities.',
    type: [ProductOrderDto],
  })
  @IsArray({ message: 'Products field must be an array.' })
  @ArrayMinSize(1, { message: 'At least one product must be included.' })
  @ValidateNested({ each: true })
  @Type(() => ProductOrderDto)
  products: ProductOrderDto[];
}

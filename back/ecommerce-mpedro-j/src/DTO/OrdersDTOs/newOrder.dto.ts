import {
  IsUUID,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductOrderDto {
  @ApiProperty({
    example: 'bca35de1-e714-4ec2-93e1-95f9893624fb',
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
    description: 'List of products to order with quantities.',
    type: [ProductOrderDto],
  })
  @IsArray({ message: 'Products field must be an array.' })
  @ArrayMinSize(1, { message: 'At least one product must be included.' })
  @ValidateNested({ each: true })
  @Type(() => ProductOrderDto)
  products: ProductOrderDto[];
}

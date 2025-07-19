import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { Products } from 'src/entities/Products.entity';

export class PaginatedProductsDTO {
  @IsNotEmpty()
  @IsArray()
  data: Products[];

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsNumber()
  page: number;

  @IsNotEmpty()
  @IsNumber()
  limit: number;

  @IsNotEmpty()
  @IsNumber()
  totalPages: number;
}

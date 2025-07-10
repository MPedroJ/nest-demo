import { ArrayNotEmpty, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { IProductOrderDTO } from './productDTO';

export class IOrderDTO {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsArray()
  @ArrayNotEmpty()
  products: IProductOrderDTO[];
}

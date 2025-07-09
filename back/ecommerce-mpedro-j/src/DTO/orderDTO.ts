import { IProductOrderDTO } from './productDTO';

export interface IOrderDTO {
  userId: string;
  products: IProductOrderDTO[];
}

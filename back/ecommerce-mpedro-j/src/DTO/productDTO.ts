export interface INewProductDTO {
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

export interface IProductResponseDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

export interface IPaginatedProducts {
  data: IProductResponseDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

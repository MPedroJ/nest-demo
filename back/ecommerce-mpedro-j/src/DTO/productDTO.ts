export interface INewProductDTO {
  name: string;
  description: string;
  price: number;
  image?: string;
  stock: number;
}

export interface IProductResponseDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string | undefined;
  stock: number;
}

export interface IPaginatedProducts {
  data: IProductResponseDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IProductOrderDTO {
  id: string;
}

export interface IPreloadedProductsDTO extends INewProductDTO {
  category: string;
}

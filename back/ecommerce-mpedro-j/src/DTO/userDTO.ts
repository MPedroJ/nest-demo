export interface INewUserDTO {
  email: string;
  name: string;
  password: string;
  address: string;
  phone: number;
  country?: string;
  city?: string;
}

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

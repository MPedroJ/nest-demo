export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  country?: string;
  city?: string;
}

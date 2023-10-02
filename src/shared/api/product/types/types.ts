export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export type ICreateProduct = Omit<IProduct, 'id'>

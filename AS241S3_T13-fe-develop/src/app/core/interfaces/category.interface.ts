import { Product } from "./product.interface";

export interface Category {
  idCategory: number;
  name: string;
  description: string;
  section: string;
  delivery: boolean;
  displayOrder: number;
  state: boolean;
  createdAt: string;
  products?: Product[];
}

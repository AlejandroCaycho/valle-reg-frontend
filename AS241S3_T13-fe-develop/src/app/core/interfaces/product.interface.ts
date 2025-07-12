import { Category } from './category.interface';
import { Presentation } from './presentation.interface';

export interface Product {
  idProduct: number;
  name: string;
  description: string;
  area: string;
  area2: string | null;
  area3: string | null;
  delivery: boolean;
  state: boolean;
  createdAt: string;
  category: Category;
  presentations?: Presentation[];
}

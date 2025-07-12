import { Product } from './product.interface';

export interface Presentation {
  idPresentation: number;
  presentationName: string;
  description: string;
  code: string;
  priceTable: number;
  priceTakeaway: number;
  priceDelivery: number;
  unitCost: number;
  delivery: boolean;
  state: boolean;
  createdAt: string;
  product: Product;
}

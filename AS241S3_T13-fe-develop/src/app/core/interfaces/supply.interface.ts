export interface Supply {
  idSupply: number;
  name: string;
  code: string;
  category: string;
  unit: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  location: string;
  unitPrice: number;
  totalCost: number | null;
  supplier: string;
  lastPurchaseDate: string;
  expirationDate: string;
  productionDate: string;
  lotNumber: string;
  requiresRefrigeration: boolean;
  recommendedTemperature: string;
  hasAllergens: boolean;
  allergenType: string | null;
  description: string;
  imageUrl: string;
  state: boolean;
  createdAt: string;
}

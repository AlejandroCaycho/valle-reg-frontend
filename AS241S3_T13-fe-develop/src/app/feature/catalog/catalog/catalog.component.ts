import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../../core/interfaces/category.interface';
import { Product } from '../../../core/interfaces/product.interface';
import { Presentation } from '../../../core/interfaces/presentation.interface';
import { Supply } from '../../../core/interfaces/supply.interface';

import { CategoryService } from '../../../core/services/category.service';
import { ProductService } from '../../../core/services/product.service';
import { PresentationService } from '../../../core/services/presentation.service';
import { SupplyService } from '../../../core/services/supply.service';

import { CategoryFormComponent } from '../category-form/category-form.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { PresentationFormComponent } from '../presentation-form/presentation-form.component';
import { SupplyFormComponent } from '../supply-form/supply-form.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    CategoryFormComponent,
    ProductFormComponent,
    PresentationFormComponent,
    SupplyFormComponent,
  ],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  sections: string[] = ['Platos y Bebidas', 'Combos', 'Ofertas', 'Insumos'];
  selectedSection: string = 'Platos y Bebidas';

  categories: Category[] = [];
  selectedCategory: Category | null = null;

  products: Product[] = [];
  selectedProduct: Product | null = null;

  presentations: Presentation[] = [];

  supplies: Supply[] = [];
  loadingSupplies = false;

  modalType: 'category' | 'product' | 'presentation' | 'supply' | null = null;
  modalData: any = null;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private presentationService: PresentationService,
    private supplyService: SupplyService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadSupplies();
  }

  selectSection(section: string): void {
    this.selectedSection = section;
    this.selectedCategory = null;
    this.selectedProduct = null;
    this.products = [];
    this.presentations = [];

    if (section !== 'Insumos') {
      this.loadCategories();
    }

    this.closeModal();
  }

  getSectionImage(section: string): string {
    switch (section) {
      case 'Platos y Bebidas': return '/icons/platosybebidas.png';
      case 'Combos': return '/icons/combos.png';
      case 'Ofertas': return '/icons/oferta.png';
      case 'Insumos': return '/icons/insumos.png';
      default: return '';
    }
  }

  openModal(type: typeof this.modalType, data: any = null): void {
    this.modalType = type;
    this.modalData = data;
  }

  closeModal(): void {
    this.modalType = null;
    this.modalData = null;

    if (this.selectedSection !== 'Insumos') {
      this.loadCategories();
      if (this.selectedCategory) this.selectCategory(this.selectedCategory);
      if (this.selectedProduct) this.selectProduct(this.selectedProduct);
    } else {
      this.loadSupplies();
    }
  }

  // === CRUD Categorías / Productos / Presentaciones ===
  loadCategories(): void {
    this.categoryService.getActive().subscribe(res => {
      this.categories = res.filter(c => c.section === this.selectedSection);
    });
  }

  selectCategory(cat: Category): void {
    this.selectedCategory = cat;
    this.selectedProduct = null;
    this.presentations = [];
    this.productService.getByCategory(cat.idCategory).subscribe(res => this.products = res);
  }

  selectProduct(prod: Product): void {
    this.selectedProduct = prod;
    this.presentationService.getByProduct(prod.idProduct).subscribe(res => this.presentations = res);
  }

  handleAddProduct(): void {
    if (!this.selectedCategory) {
      Swal.fire('Selecciona una categoría', 'Debes seleccionar o crear una categoría antes de crear un producto.', 'warning');
      return;
    }
    this.openModal('product');
  }

  handleAddPresentation(): void {
    if (!this.selectedProduct) {
      Swal.fire('Selecciona un producto', 'Debes seleccionar o crear un producto antes de crear una presentación.', 'warning');
      return;
    }
    this.openModal('presentation');
  }

  deleteCategory(cat: Category): void {
    Swal.fire({
      title: `¿Eliminar categoría "${cat.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        this.categoryService.delete(cat.idCategory).subscribe(() => {
          if (this.selectedCategory?.idCategory === cat.idCategory) this.selectedCategory = null;
          this.loadCategories();
        });
      }
    });
  }

  deleteProduct(prod: Product): void {
    Swal.fire({
      title: `¿Eliminar producto "${prod.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        this.productService.delete(prod.idProduct).subscribe(() => this.selectCategory(this.selectedCategory!));
      }
    });
  }

  deletePresentation(pres: Presentation): void {
    Swal.fire({
      title: `¿Eliminar presentación "${pres.presentationName}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        this.presentationService.delete(pres.idPresentation).subscribe(() => this.selectProduct(this.selectedProduct!));
      }
    });
  }

  // === CRUD Insumos ===
  loadSupplies(): void {
    this.loadingSupplies = true;
    this.supplyService.getActive().subscribe(res => {
      this.supplies = res;
      this.loadingSupplies = false;
    });
  }

  handleAddSupply(): void {
    this.openModal('supply');
  }

  deleteSupply(supply: Supply): void {
    Swal.fire({
      title: `¿Eliminar insumo "${supply.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        this.supplyService.delete(supply.idSupply).subscribe(() => this.loadSupplies());
      }
    });
  }
}

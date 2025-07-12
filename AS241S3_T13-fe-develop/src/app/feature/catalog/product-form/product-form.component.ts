import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../core/interfaces/product.interface';
import { ProductService } from '../../../core/services/product.service';
import { Category } from '../../../core/interfaces/category.interface';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product | null = null;
  @Input() category!: Category;
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;
  isEdit = false;
  loading = false;

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit(): void {
    this.isEdit = !!this.product;

    this.form = this.fb.group({
      name: [this.product?.name || '', Validators.required],
      description: [this.product?.description || '', Validators.required],
      area: [this.product?.area || '', Validators.required],
      area2: [this.product?.area2 || null],
      area3: [this.product?.area3 || null],
      delivery: [this.product?.delivery ?? true],
      state: [this.product?.state ?? true]
    });
  }

  save(): void {
    if (this.form.invalid) return;
    this.loading = true;

    const formData: Product = {
      ...this.product,
      ...this.form.value,
      category: this.category
    };

    const req$ = this.isEdit && this.product?.idProduct
      ? this.productService.update(this.product.idProduct, formData)
      : this.productService.create(formData);

    req$.subscribe({
      next: () => {
        this.loading = false;
        this.close.emit();
      },
      error: () => this.loading = false
    });
  }

  cancel(): void {
    this.close.emit();
  }
}

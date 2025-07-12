import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../../core/interfaces/category.interface';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Input() category: Category | null = null;
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;
  loading = false;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.category;

    this.form = this.fb.group({
      name: [this.category?.name || '', Validators.required],
      description: [this.category?.description || '', Validators.required],
      section: [this.category?.section || '', Validators.required],
      delivery: [this.category?.delivery ?? true],
      displayOrder: [this.category?.displayOrder ?? 1, [Validators.required, Validators.min(1)]],
      state: [this.category?.state ?? true]
    });
  }

  save(): void {
    if (this.form.invalid) return;

    this.loading = true;
    const formData: Category = {
      ...this.category,
      ...this.form.value
    };

    const request$ = this.isEdit && this.category?.idCategory
      ? this.categoryService.update(this.category.idCategory, formData)
      : this.categoryService.create(formData);

    request$.subscribe({
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

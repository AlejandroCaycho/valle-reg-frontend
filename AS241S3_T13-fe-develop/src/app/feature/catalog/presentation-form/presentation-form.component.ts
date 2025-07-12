import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Presentation } from '../../../core/interfaces/presentation.interface';
import { Product } from '../../../core/interfaces/product.interface';
import { PresentationService } from '../../../core/services/presentation.service';

@Component({
  selector: 'app-presentation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './presentation-form.component.html',
  styleUrls: ['./presentation-form.component.scss']
})
export class PresentationFormComponent implements OnInit {
  @Input() presentation: Presentation | null = null;
  @Input() product!: Product;
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;
  isEdit = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private presentationService: PresentationService
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.presentation;

    this.form = this.fb.group({
      presentationName: [this.presentation?.presentationName || '', Validators.required],
      description: [this.presentation?.description || '', Validators.required],
      code: [this.presentation?.code || '', Validators.required],
      priceTable: [this.presentation?.priceTable ?? 0, Validators.required],
      priceTakeaway: [this.presentation?.priceTakeaway ?? 0, Validators.required],
      priceDelivery: [this.presentation?.priceDelivery ?? 0, Validators.required],
      unitCost: [this.presentation?.unitCost ?? 0, Validators.required],
      delivery: [this.presentation?.delivery ?? true],
      state: [this.presentation?.state ?? true]
    });
  }

  save(): void {
    if (this.form.invalid) return;
    this.loading = true;

    const formData: Presentation = {
      ...this.presentation,
      ...this.form.value,
      product: this.product
    };

    const request$ = this.isEdit && this.presentation?.idPresentation
      ? this.presentationService.update(this.presentation.idPresentation, formData)
      : this.presentationService.create(formData);

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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Supply } from '../../../core/interfaces/supply.interface';
import { SupplyService } from '../../../core/services/supply.service';

@Component({
  selector: 'app-supply-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './supply-form.component.html',
  styleUrls: ['./supply-form.component.scss']
})
export class SupplyFormComponent implements OnInit {
  @Input() supply: Supply | null = null;
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;
  loading = false;
  isEdit = false;

  constructor(private fb: FormBuilder, private supplyService: SupplyService) {}

  ngOnInit(): void {
    this.isEdit = !!this.supply;

    this.form = this.fb.group({
      name: [this.supply?.name || '', Validators.required],
      code: [this.supply?.code || '', Validators.required],
      category: [this.supply?.category || '', Validators.required],
      unit: [this.supply?.unit || '', Validators.required],
      quantity: [this.supply?.quantity ?? 0, Validators.required],
      minStock: [this.supply?.minStock ?? 0],
      maxStock: [this.supply?.maxStock ?? 0],
      location: [this.supply?.location || ''],
      unitPrice: [this.supply?.unitPrice ?? 0],
      totalCost: [this.supply?.totalCost ?? null],
      supplier: [this.supply?.supplier || ''],
      lastPurchaseDate: [this.supply?.lastPurchaseDate || ''],
      expirationDate: [this.supply?.expirationDate || ''],
      productionDate: [this.supply?.productionDate || ''],
      lotNumber: [this.supply?.lotNumber || ''],
      requiresRefrigeration: [this.supply?.requiresRefrigeration ?? false],
      recommendedTemperature: [this.supply?.recommendedTemperature || ''],
      hasAllergens: [this.supply?.hasAllergens ?? false],
      allergenType: [this.supply?.allergenType || ''],
      description: [this.supply?.description || ''],
      imageUrl: [this.supply?.imageUrl || ''],
      state: [this.supply?.state ?? true]
    });
  }

  save(): void {
    if (this.form.invalid) return;
    this.loading = true;

    const formData: Supply = {
      ...this.supply,
      ...this.form.value
    };

    const req$ = this.isEdit && this.supply?.idSupply
      ? this.supplyService.update(this.supply.idSupply, formData)
      : this.supplyService.create(formData);

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

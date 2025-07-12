import { Routes } from '@angular/router';
import { MozoLoginComponent } from './feature/auth/mozo-login/mozo-login.component';
import { AdminLoginComponent } from './feature/auth/admin-login/admin-login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { UserTableComponent } from './feature/user/user-table/user-table.component';
import { PopoverUsersComponent } from './feature/user/popover-users/popover-users.component';

import { CatalogComponent } from './feature/catalog/catalog/catalog.component';
import { CategoryFormComponent } from './feature/catalog/category-form/category-form.component';
import { ProductFormComponent } from './feature/catalog/product-form/product-form.component';
import { PresentationFormComponent } from './feature/catalog/presentation-form/presentation-form.component';
import { SupplyFormComponent } from './feature/catalog/supply-form/supply-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'admin-login', pathMatch: 'full' },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'mozo-login', component: MozoLoginComponent },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'usuarios', component: UserTableComponent },
      { path: 'form-user', component: PopoverUsersComponent },
      { path: 'catalog', component: CatalogComponent },
      { path: 'form-category', component: CategoryFormComponent },
      { path: 'form-product', component: ProductFormComponent },
      { path: 'form-presentation', component: PresentationFormComponent },
      { path: 'form-supply', component: SupplyFormComponent }
    ]
  }
];

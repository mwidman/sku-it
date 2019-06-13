import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './inventory/components/dashboard/dashboard.component';
import { SkuAddComponent } from './inventory/components/sku-add/sku-add.component';
import { TransactionAddComponent } from './inventory/components/transaction-add/transaction-add.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'add', component: SkuAddComponent },
  { path: 'transaction', component: TransactionAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

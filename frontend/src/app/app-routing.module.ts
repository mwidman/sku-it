import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './inventory/components/dashboard/dashboard.component';
import { SkuAddComponent } from './inventory/components/sku-add/sku-add.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add', component: SkuAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

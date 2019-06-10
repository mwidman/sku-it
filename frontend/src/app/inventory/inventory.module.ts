import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SkuInComponent } from './components/sku-in/sku-in.component';
import { SkuOutComponent } from './components/sku-out/sku-out.component';


export const COMPONENTS = [
  DashboardComponent,
  SkuInComponent,
  SkuOutComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule
  ],
  exports: COMPONENTS,
})
export class InventoryModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SkuInComponent } from './components/sku-in/sku-in.component';
import { SkuOutComponent } from './components/sku-out/sku-out.component';
import { StoreModule } from '@ngrx/store';

import { reducers } from './reducers';
import { SkuEffects } from './effects';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material.module';

export const COMPONENTS = [
  DashboardComponent,
  SkuInComponent,
  SkuOutComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    StoreModule.forFeature('inventory', reducers),
    EffectsModule.forFeature([SkuEffects]),
    MaterialModule,
  ],
  exports: COMPONENTS,
})
export class InventoryModule { }

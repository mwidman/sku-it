import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SkuAddComponent } from './components/sku-add/sku-add.component';
import { SkuInComponent } from './components/sku-in/sku-in.component';
import { SkuOutComponent } from './components/sku-out/sku-out.component';
import { reducers } from './reducers';
import { SkuEffects } from './effects';
import { MaterialModule } from '../material.module';

export const COMPONENTS = [
  DashboardComponent,
  SkuAddComponent,
  SkuInComponent,
  SkuOutComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    StoreModule.forFeature('inventory', reducers),
    EffectsModule.forFeature([SkuEffects]),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: COMPONENTS,
})
export class InventoryModule { }

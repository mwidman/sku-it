import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SkuInComponent } from './sku-in/sku-in.component';
import { SkuOutComponent } from './sku-out/sku-out.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SkuInComponent,
    SkuOutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InventoryModule } from './inventory/inventory.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InventoryModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

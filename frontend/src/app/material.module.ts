import { NgModule } from '@angular/core'; 
import {
  MatSidenavModule,
  MatToolbarModule,
  MatGridListModule,
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class MaterialModule {}

import { NgModule } from '@angular/core'; 
import {
  MatSidenavModule,
  MatToolbarModule,
  MatGridListModule,
  MatListModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatFormFieldModule,
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
    MatFormFieldModule,
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
  ]
})
export class MaterialModule {}

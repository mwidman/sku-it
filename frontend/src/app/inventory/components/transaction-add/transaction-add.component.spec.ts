import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TransactionAddComponent } from './transaction-add.component';
import { MaterialModule } from '../../../material.module';

describe('TransactionAddComponent', () => {
  let component: TransactionAddComponent;
  let fixture: ComponentFixture<TransactionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionAddComponent ],
      imports: [ ReactiveFormsModule, RouterModule, MaterialModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

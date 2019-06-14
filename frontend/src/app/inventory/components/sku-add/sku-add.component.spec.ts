import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuAddComponent } from './sku-add.component';

describe('SkuAddComponent', () => {
  let component: SkuAddComponent;
  let fixture: ComponentFixture<SkuAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

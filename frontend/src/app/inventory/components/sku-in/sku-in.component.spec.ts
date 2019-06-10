import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuInComponent } from './sku-in.component';

describe('SkuInComponent', () => {
  let component: SkuInComponent;
  let fixture: ComponentFixture<SkuInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

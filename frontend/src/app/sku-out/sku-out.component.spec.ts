import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuOutComponent } from './sku-out.component';

describe('SkuOutComponent', () => {
  let component: SkuOutComponent;
  let fixture: ComponentFixture<SkuOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

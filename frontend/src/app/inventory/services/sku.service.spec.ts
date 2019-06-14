import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';

import { SkuService } from './sku.service';

describe('SkuService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ 
      { provide: 'BASE_API_URL', useValue: '/api' },
      { provide: HttpClient, useClass: HttpTestingController },
    ]
  }));

  it('should be created', () => {
    const service: SkuService = TestBed.get(SkuService);
    expect(service).toBeTruthy();
  });

});

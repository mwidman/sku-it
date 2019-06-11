import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Sku } from '../models/sku';

@Injectable({
  providedIn: 'root'
})
export class SkuService {

  private API_PATH = 'http://192.168.99.100/inventory/api';


  constructor(
    private http: HttpClient
  ) { }

  fetchSkus(): Observable<Sku[]> {
    /*
    return this.http
      .get<Sku[]>(`${this.API_PATH}/skus`)
    */
    const skus = [
      { id: '1', name: 'Sku1', description: 'Sku 1', base_units: 'each', current_quantity: 0 },
      { id: '2', name: 'Sku2', description: 'Sku 2', base_units: 'each', current_quantity: 0 },
      { id: '3', name: 'Sku3', description: 'Sku 3', base_units: 'each', current_quantity: 0 },
    ];
    return of(skus);
  }

  addSku(sku: Sku): Observable<Sku> {
    /*
    return this.http
      .post<Sku>(`${this.API_PATH}/skus`, { sku })
    */
    return of(sku);
  }

}

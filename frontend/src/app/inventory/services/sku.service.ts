import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Sku } from '../models/sku';

@Injectable({
  providedIn: 'root'
})
export class SkuService {

  private API_PATH = '/api';


  constructor(
    private http: HttpClient
  ) { }

  fetchSkus(): Observable<Sku[]> {
    console.log("Fetching Skus");
    return this.http
      .get<Sku[]>(`${this.API_PATH}/skus/`)
  }

  addSku(sku: Sku): Observable<Sku> {
    return this.http
      .post<Sku>(`${this.API_PATH}/skus/`, sku)
  }

}

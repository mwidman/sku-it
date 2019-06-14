import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Sku } from '../models/sku';

@Injectable({
  providedIn: 'root'
})
export class SkuService {

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) { }

  fetchSkus(): Observable<Sku[]> {
    console.log("Fetching Skus");
    return this.http
      .get<Sku[]>(`${this.baseUrl}/skus/`)
  }

  addSku(sku: Sku): Observable<Sku> {
    return this.http
      .post<Sku>(`${this.baseUrl}/skus/`, sku)
  }

}

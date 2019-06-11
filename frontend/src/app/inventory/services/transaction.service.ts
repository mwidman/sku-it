import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Transaction, TxType } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private API_PATH = 'http://192.168.99.100/inventory/api';


  constructor(
    private http: HttpClient
  ) { }

  fetchTransactions(): Observable<Transaction[]> {
    /*
    return this.http
      .get<Transaction[]>(`${this.API_PATH}/skus`)
    */
    const transactions = [
      { id: '1', sku_id: '1', tx_type: TxType.PURCHASED, client: 'Bob', quantity: 1, tx_date: new Date() },
      { id: '2', sku_id: '2', tx_type: TxType.SOLD, client: 'Dan', quantity: 2, tx_date: new Date()},
      { id: '3', sku_id: '3', tx_type: TxType.PURCHASED, client: 'Guy', quantity: 3, tx_date: new Date()},
    ];
    return of(transactions);
  }

  addTransaction(sku: Transaction): Observable<Transaction> {
    /*
    return this.http
      .post<Transaction>(`${this.API_PATH}/skus`, { sku })
    */
    return of(sku);
  }

}

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Transaction, TxType } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private API_PATH = '/inventory/api';


  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) { }

  fetchTransactions(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(`${this.baseUrl}/transactions/`)
  }

  addTransaction(tx: Transaction): Observable<Transaction> {
    return this.http
      .post<Transaction>(`${this.baseUrl}/transactions/`, tx)
  }

}

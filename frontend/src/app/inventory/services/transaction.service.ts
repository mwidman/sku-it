import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Transaction, TxType } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private API_PATH = '/api';


  constructor(
    private http: HttpClient
  ) { }

  fetchTransactions(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(`${this.API_PATH}/transactions/`)
  }

  addTransaction(tx: Transaction): Observable<Transaction> {
    return this.http
      .post<Transaction>(`${this.API_PATH}/transactions/`, tx)
  }

}

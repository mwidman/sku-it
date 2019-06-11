import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, of, } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Transaction, TxType } from '../models/transaction';
import { 
  TransactionActions,
  FetchTransactionsSuccess,
  AddTransactionSuccess,
  AddTransaction
} from '../actions/transaction.actions';

@Injectable()
export class TransactionEffects {

  constructor(
    private actions$: Actions
  ) { }

  fetchTransactions$ = createEffect(
    () => ({ scheduler = asyncScheduler } = {}) =>
      this.actions$.pipe(
        ofType(TransactionActions.FETCH_TRANSACTIONS),
        switchMap(() => {
          const transactions = [
            { id: '1', sku_id: '1', tx_type: TxType.PURCHASED, client: 'Bob', quantity: 1, tx_date: new Date() },
            { id: '2', sku_id: '2', tx_type: TxType.SOLD, client: 'Dan', quantity: 2, tx_date: new Date()},
            { id: '3', sku_id: '3', tx_type: TxType.PURCHASED, client: 'Guy', quantity: 3, tx_date: new Date()},
          ];
          return of(new FetchTransactionsSuccess(transactions));
        })
      )
  )

  addTransaction$ = createEffect(
    () => ({ scheduler = asyncScheduler } = {}) =>
      this.actions$.pipe(
        ofType<AddTransaction>(TransactionActions.ADD_TRANSACTION),
        switchMap((action) => {
          const transaction = action.payload;
          return of(new AddTransactionSuccess(transaction));
          })
      )
  )

}

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, of, } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { Transaction, TxType } from '../models/transaction';
import { 
  TransactionActions,
  FetchTransactionsSuccess,
  FetchTransactionsFailure,
  AddTransaction,
  AddTransactionSuccess,
} from '../actions/transaction.actions';
import { TransactionService } from '../services/transaction.service';

@Injectable()
export class TransactionEffects {

  constructor(
    private actions$: Actions,
    private transactionService: TransactionService,
  ) { }

  fetchTransactions$ = createEffect(
    () => ({ scheduler = asyncScheduler } = {}) =>
      this.actions$.pipe(
        ofType(TransactionActions.FETCH_TRANSACTIONS),
        switchMap(() => {
          return this.transactionService.fetchTransactions().pipe(
            map((transactions) => new FetchTransactionsSuccess(transactions)),
            catchError((error) => {
              return of(new FetchTransactionsFailure(error))
            })
          );
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

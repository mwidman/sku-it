import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, of, } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Transaction, TxType } from '../models/transaction';
import { 
  TransactionActions,
  FetchTransactionsSuccess,
  FetchTransactionsFailure,
  AddTransaction,
  AddTransactionSuccess,
  AddTransactionFailure,
} from '../actions/transaction.actions';
import * as fromInventory from '../reducers';
import { TransactionService } from '../services/transaction.service';
import { convertError } from './utils';

@Injectable()
export class TransactionEffects {

  constructor(
    private actions$: Actions,
    private store: Store<fromInventory.State>,
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
              const errors = convertError(error);
              return of(new FetchTransactionsFailure(errors))
            })
          );
        })
      )
  )

  addTransaction$ = createEffect(
    () => ({ scheduler = asyncScheduler } = {}) =>
      this.actions$.pipe(
        ofType<AddTransaction>(TransactionActions.ADD_TRANSACTION),
        withLatestFrom(this.store.select(fromInventory.getSelectedSkuId)),
        switchMap(([action, id]) => {
          const transaction = { ...action.payload, sku: id };
          return this.transactionService.addTransaction(transaction).pipe(
            map((tx) => new AddTransactionSuccess(tx)),
            catchError((error) => {
              const errors = convertError(error);
              return of(new AddTransactionFailure(errors));
            })
          )
        })
      )
  )

}

import { Action } from '@ngrx/store';

import { Transaction } from '../models/transaction';

export enum TransactionActions {
  FETCH_TRANSACTIONS = '[Transactions] Fetch Transactions',
  FETCH_TRANSACTIONS_SUCCESS = '[Transactions] Fetch Transactions Success',
  FETCH_TRANSACTIONS_FAILURE = '[Transactions] Fetch Transactions Failure',
  ADD_TRANSACTION = '[Transactions] Add Transaction',
  ADD_TRANSACTION_SUCCESS = '[Transactions] Add Transaction Success',
  ADD_TRANSACTION_FAILURE = '[Transactions] Add Transaction Failure',
  SELECT_TRANSACTION = '[Transactions] Select Transaction',
};

export class FetchTransactions implements Action {
  readonly type = TransactionActions.FETCH_TRANSACTIONS;
  
  constructor() { }
}

export class FetchTransactionsSuccess implements Action {
  readonly type = TransactionActions.FETCH_TRANSACTIONS_SUCCESS;
  
  constructor(public payload: Transaction[]) { }
}

export class FetchTransactionsFailure implements Action {
  readonly type = TransactionActions.FETCH_TRANSACTIONS_FAILURE;
  
  constructor(public payload: any) { }
}

export class AddTransaction implements Action {
  readonly type = TransactionActions.ADD_TRANSACTION;
  
  constructor(public payload: Transaction) { }
}

export class AddTransactionSuccess implements Action {
  readonly type = TransactionActions.ADD_TRANSACTION_SUCCESS;
  
  constructor(public payload: Transaction) { }
}

export class AddTransactionFailure implements Action {
  readonly type = TransactionActions.ADD_TRANSACTION_FAILURE;
  
  constructor(public payload: any) { }
}

export class SelectTransaction implements Action {
  readonly type = TransactionActions.SELECT_TRANSACTION;
  
  constructor(public payload: string) { }
}

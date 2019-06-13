import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Transaction } from '../models/transaction';
import { TransactionActions } from '../actions/transaction.actions';

export interface TransactionState extends EntityState<Transaction> {
  selectedTransactionId: number | null;
  fetching: boolean;
  fetchError: string;
  adding: boolean;
  addError: string;
}

export const adapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>({
  selectId: (transaction: Transaction) => transaction.id,
  sortComparer: false,
});

export const initialState: TransactionState = adapter.getInitialState({
  selectedTransactionId: null,
  fetching: false,
  fetchError: '',
  adding: false,
  addError: '',
});


export function reducer(
  state = initialState,
  action
): TransactionState {
  switch (action.type) {
    case TransactionActions.FETCH_TRANSACTIONS: {
      return {
        ...state,
        fetching: true,
        fetchError: '',
      };
    }
    case TransactionActions.FETCH_TRANSACTIONS_SUCCESS: {
      return adapter.addAll(
        action.payload,
        {
          ...state,
          loading: false
        }
      );
    }
    case TransactionActions.FETCH_TRANSACTIONS_FAILURE: {
      return {
        ...state,
        fetching: false,
        fetchError: action.payload
      };
    }
    case TransactionActions.ADD_TRANSACTION: {
      return {
        ...state,
        adding: true,
        addError: '',
      };
    }
    case TransactionActions.ADD_TRANSACTION_SUCCESS: {
      return adapter.addOne(
        action.payload,
        {
          ...state,
          adding: false,
      });
    }
    case TransactionActions.ADD_TRANSACTION_SUCCESS: {
      return {
        ...state,
        adding: false,
        addError: action.payload
      };
    }
    case TransactionActions.SELECT_TRANSACTION: {
      return {
        ...state,
        selectedTransactionId: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: TransactionState) => state.selectedTransactionId;

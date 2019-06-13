import { createFeatureSelector, combineReducers, Action, createSelector, } from '@ngrx/store';

import * as fromSku from './sku.reducer';
import * as fromTransaction from './transaction.reducer';
import * as fromRoot from '../../reducers';

export interface InventoryState {
  skus: fromSku.SkuState;
  transactions: fromTransaction.TransactionState;
}

export interface State extends fromRoot.AppState {
  inventory: InventoryState;
}

export function reducers(state: InventoryState | undefined, action: Action) {
  return combineReducers({
    skus: fromSku.reducer,
    transactions: fromTransaction.reducer,
  })(state, action);
}

export const getInventoryState = createFeatureSelector<State, InventoryState>('inventory');

/* Start Sku Section  */

export const getSkuEntitiesState = createSelector(
  getInventoryState,
  state => state.skus
);

export const {
  selectAll: getAllSkus,
  selectEntities: getSkuEntities,
  selectIds: getSkuIds,
  selectTotal: getTotalSkus,
} = fromSku.adapter.getSelectors(getSkuEntitiesState);

export const getSelectedSkuId = createSelector(
  getSkuEntitiesState,
  fromSku.getSelectedId,
);

export const getSelectedSku = createSelector(
  getSkuEntities,
  getSelectedSkuId,
  (entities, id) => entities[id]
);

export const getSkuFetching = createSelector(
  getSkuEntitiesState,
  fromSku.getFetching,
);

export const getSkuFetchErrors = createSelector(
  getSkuEntitiesState,
  fromSku.getFetchErrors,
);

export const getSkuAdding = createSelector(
  getSkuEntitiesState,
  fromSku.getAdding,
);

export const getSkuAddErrors = createSelector(
  getSkuEntitiesState,
  fromSku.getAddErrors,
);
/* End Sku Section  */

/* Start Transaction Section  */
export const getTransactionEntitiesState = createSelector(
  getInventoryState,
  state => state.transactions
);

export const {
  selectAll: getAllTransactions,
  selectEntities: getTransactionEntities,
  selectIds: getTransactionIds,
  selectTotal: getTotalTransactions,
} = fromSku.adapter.getSelectors(getSkuEntitiesState);

export const getSelectedTransactionId = createSelector(
  getTransactionEntitiesState,
  fromTransaction.getSelectedId,
);

export const getSelectedTransaction = createSelector(
  getTransactionEntities,
  getSelectedTransactionId,
  (entities, id) => entities[id]
);
/* End Transaction Section  */

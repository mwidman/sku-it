import { createFeatureSelector, combineReducers, Action, } from '@ngrx/store';

import * as fromSku from './sku.reducer';
import * as fromRoot from '../../reducers';

export interface InventoryState {
  skus: fromSku.State;
}

export interface State extends fromRoot.AppState {
  inventory: InventoryState;
}

export function reducers(state: InventoryState | undefined, action: Action) {
  return combineReducers({
    skus: fromSku.reducer,
  })(state, action);
}

export const getSkuState = createFeatureSelector<State, InventoryState>('inventory');

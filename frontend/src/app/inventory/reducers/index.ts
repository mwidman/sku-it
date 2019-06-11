import { createFeatureSelector, combineReducers, Action, createSelector, } from '@ngrx/store';

import * as fromSku from './sku.reducer';
import * as fromRoot from '../../reducers';

export interface InventoryState {
  skus: fromSku.SkuState;
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

export const getSkuEntitiesState = createSelector(
  getSkuState,
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

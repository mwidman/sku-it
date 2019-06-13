import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Sku } from '../models/sku';
import { SkuActions } from '../actions/sku.actions';

export interface SkuState extends EntityState<Sku> {
  selectedSkuId: number | null;
  fetching: boolean;
  fetchErrors: object;
  adding: boolean;
  addErrors: object;
}

export const adapter: EntityAdapter<Sku> = createEntityAdapter<Sku>({
  selectId: (sku: Sku) => sku.id,
  sortComparer: false,
});

export const initialState: SkuState = adapter.getInitialState({
  selectedSkuId: null,
  fetching: false,
  fetchErrors: null,
  adding: false,
  addErrors: null,
});


export function reducer(
  state = initialState,
  action
): SkuState {
  switch (action.type) {
    case SkuActions.FETCH_SKUS: {
      return {
        ...state,
        fetching: true,
        fetchErrors: null,
      };
    }
    case SkuActions.FETCH_SKUS_SUCCESS: {
      return adapter.addAll(
        action.payload,
        {
          ...state,
          loading: false
        }
      );
    }
    case SkuActions.FETCH_SKUS_FAILURE: {
      return {
        ...state,
        fetching: false,
        fetchErrors: action.payload
      };
    }
    case SkuActions.ADD_SKU: {
      return {
        ...state,
        adding: true,
        addErrors: null,
      };
    }
    case SkuActions.ADD_SKU_SUCCESS: {
      return adapter.addOne(
        action.payload,
        {
          ...state,
          adding: false,
      });
    }
    case SkuActions.ADD_SKU_FAILURE: {
      return {
        ...state,
        adding: false,
        addErrors: action.payload
      };
    }
    case SkuActions.SELECT_SKU: {
      return {
        ...state,
        selectedSkuId: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: SkuState) => state.selectedSkuId;
export const getFetching = (state: SkuState) => state.fetching;
export const getFetchErrors = (state: SkuState) => state.fetchErrors;
export const getAdding = (state: SkuState) => state.adding;
export const getAddErrors = (state: SkuState) => state.addErrors;

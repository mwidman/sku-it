import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Sku } from '../models/sku';
import { SkuActions } from '../actions/sku.actions';

export interface SkuState extends EntityState<Sku> {
  selectedSkuId: string | null;
  fetching: boolean;
  fetchError: string;
  adding: boolean;
  addError: string;
}

export const adapter: EntityAdapter<Sku> = createEntityAdapter<Sku>({
  selectId: (sku: Sku) => sku.id,
  sortComparer: false,
});

export const initialState: SkuState = adapter.getInitialState({
  selectedSkuId: null,
  fetching: false,
  fetchError: '',
  adding: false,
  addError: '',
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
        fetchError: '',
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
        fetchError: action.payload
      };
    }
    case SkuActions.ADD_SKU: {
      return {
        ...state,
        adding: true,
        addError: '',
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
    case SkuActions.ADD_SKU_SUCCESS: {
      return {
        ...state,
        adding: false,
        addError: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: SkuState) => state.selectedSkuId;

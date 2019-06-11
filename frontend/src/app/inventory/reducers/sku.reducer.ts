import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Sku } from '../models/sku';
import { SkuActions } from '../actions/sku.actions';

export interface State extends EntityState<Sku> {
  selectedSkuId: string | null;
  loading: boolean;
  error: string;
}

export const adapter: EntityAdapter<Sku> = createEntityAdapter<Sku>({
  selectId: (sku: Sku) => sku.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedSkuId: null,
  loading: false,
  error: '',
});


export function reducer(
  state = initialState,
  action
): State {
  switch (action.type) {
    case SkuActions.FETCH_SKUS: {
      return {
        ...state,
        loading: true
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
        loading: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedSkuId;

import { Action } from '@ngrx/store';

import { Sku } from '../models/sku';

export enum SkuActions {
  FETCH_SKUS = '[Skus] Load Skus',
  FETCH_SKUS_SUCCESS = '[Skus] Load Skus Success',
  FETCH_SKUS_FAILURE = '[Skus] Load Skus Failure',
};

export class FetchSkus implements Action {
  readonly type = SkuActions.FETCH_SKUS;
  
  constructor() { }
}

export class FetchSkusSuccess implements Action {
  readonly type = SkuActions.FETCH_SKUS_SUCCESS;
  
  constructor(public payload: Sku[]) { }
}

export class FetchSkusFailure implements Action {
  readonly type = SkuActions.FETCH_SKUS_FAILURE;
  
  constructor(public payload: any) { }
}

export type SkuActionType
  = FetchSkus
  | FetchSkusSuccess
  | FetchSkusFailure
  ;

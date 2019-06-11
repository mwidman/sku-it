import { Action } from '@ngrx/store';

import { Sku } from '../models/sku';

export enum SkuActions {
  FETCH_SKUS = '[Skus] Fetch Skus',
  FETCH_SKUS_SUCCESS = '[Skus] Fetch Skus Success',
  FETCH_SKUS_FAILURE = '[Skus] Fetch Skus Failure',
  ADD_SKU = '[Skus] Add Sku',
  ADD_SKU_SUCCESS = '[Skus] Add Sku Success',
  ADD_SKU_FAILURE = '[Skus] Add Sku Failure',
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

export class AddSku implements Action {
  readonly type = SkuActions.ADD_SKU;
  
  constructor(public payload: Sku) { }
}

export class AddSkuSuccess implements Action {
  readonly type = SkuActions.ADD_SKU_SUCCESS;
  
  constructor(public payload: Sku) { }
}

export class AddSkuFailure implements Action {
  readonly type = SkuActions.ADD_SKU_FAILURE;
  
  constructor(public payload: any) { }
}


export type SkuActionTypes
  = FetchSkus
  | FetchSkusSuccess
  | FetchSkusFailure
  ;

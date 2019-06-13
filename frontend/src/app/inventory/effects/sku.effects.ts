import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, of, } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { isString, isObject } from 'util';

import { Sku } from '../models/sku';
import { 
  SkuActions,
  FetchSkusSuccess,
  AddSkuSuccess,
  AddSku,
  FetchSkusFailure,
  AddSkuFailure
} from '../actions/sku.actions';
import { SkuService } from '../services/sku.service';

@Injectable()
export class SkuEffects {

  constructor(
    private actions$: Actions,
    private skuService: SkuService,
  ) { }

  fetchSkus$ = createEffect(
    () => ({ scheduler = asyncScheduler } = {}) =>
      this.actions$.pipe(
        ofType(SkuActions.FETCH_SKUS),
        switchMap(() => {
          return this.skuService.fetchSkus().pipe(
            map((skus) => new FetchSkusSuccess(skus)),
            catchError((error) => {
              return of(new FetchSkusFailure(error));
            })
          );
        })
      )
  )

  addSku$ = createEffect(
    () => ({ scheduler = asyncScheduler } = {}) =>
      this.actions$.pipe(
        ofType<AddSku>(SkuActions.ADD_SKU),
        switchMap((action) => {
          return this.skuService.addSku(action.payload).pipe(
            map((sku) => new AddSkuSuccess(sku)),
            catchError((error) => {
              const errors = convertError(error);
              return of(new AddSkuFailure(errors));
            })
          )
        })
      )
  )

}

const convertError = (error: any): object => { 
  if(error.error) {
    if(isString(error.error)) {
      return { error: error.error};
    }
    else if(isObject(error.error)) {
      return error.error;
    }
  }
  else if(error.status) {
    switch(error.status) {
      case 400: return { error: 'The was a problem with your request (invalid value, etc.).' };
      case 404: return { error: 'Could not find the resource you were looking for.' };
      case 500: return { error: 'An unknown server error occurred.' };
      default: return { error: 'Uknown error occured' };
    }
  }
  else {
    return { error: 'Uknown error occured' };
  }


}

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, of, } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

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
              return of(new AddSkuFailure(error));
            })
          )
        })
      )
  )

}

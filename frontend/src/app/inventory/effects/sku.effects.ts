import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, of, } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Sku } from '../models/sku';
import { SkuActions, FetchSkusSuccess } from '../actions/sku.actions';

@Injectable()
export class SkuEffects {

  constructor(
    private actions$: Actions
  ) { }

  fetchSkus$ = createEffect(
    () => ({ scheduler = asyncScheduler } = {}) =>
      this.actions$.pipe(
        ofType(SkuActions.FETCH_SKUS),
        switchMap(() => {
          const skus = [
            { id: '1', name: 'Sku1', description: 'Sku 1', base_units: 'each', current_quantity: 0 },
            { id: '2', name: 'Sku2', description: 'Sku 2', base_units: 'each', current_quantity: 0 },
            { id: '3', name: 'Sku3', description: 'Sku 3', base_units: 'each', current_quantity: 0 },
          ];
          return of(new FetchSkusSuccess(skus));
        })
      )
  )


}

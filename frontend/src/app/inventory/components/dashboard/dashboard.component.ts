import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromInventory from '../../reducers';
import { FetchSkus, SelectSku } from '../../actions/sku.actions';
import { Sku } from '../../models/sku';
import { TxType } from '../../models/transaction';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  txType = TxType;

  skus: Observable<Sku[]>;

  constructor(
    private store: Store<fromInventory.State>,
    private router: Router) {
    this.skus = store.pipe(
      select(fromInventory.getAllSkus)
    );
   }

  ngOnInit() {
    this.store.dispatch(new FetchSkus());
  }

  openTransactionAdd(skuId: string, txType: TxType) {
    this.store.dispatch(new SelectSku(skuId));
    this.router.navigate(['/transaction'], { queryParams: { txType } })
  }

}

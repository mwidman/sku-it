import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromInventory from '../../reducers';
import { FetchSkus } from '../../actions/sku.actions';
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

  constructor(private store: Store<fromInventory.State>) {
    this.skus = store.pipe(
      select(fromInventory.getAllSkus)
    );
   }

  ngOnInit() {
    this.store.dispatch(new FetchSkus());
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromInventory from '../../reducers';
import { TxType } from '../../models/transaction';
import { Sku } from '../../models/sku';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss']
})
export class TransactionAddComponent implements OnInit {

  txForm: FormGroup = new FormGroup({
    sku_name: new FormControl('', [Validators.required]),
    client: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.maxLength(24)]),
    total_cost: new FormControl(0, [Validators.min(0)]),
  });

  txType: string;

  sku$: Observable<Sku>;

  constructor(
    private store: Store<fromInventory.State>,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.txType = this.route.snapshot.queryParamMap.get("txType");
    this.sku$ = this.store.pipe(
      select(fromInventory.getSelectedSku)
    );
  }

  onSubmit() {
    if(this.txForm.valid) {
      const transaction = this.txForm.value;
      console.warn(transaction);
      //this.store.dispatch(new AddSku(transaction));
    }
  }

  hasError(controlName: string, errorName: string) {
    return this.txForm.controls[controlName].hasError(errorName);
  }

  convertTxType() {
    switch(this.txType) {
      case TxType.SOLD: return 'Shipping';
      case TxType.PURCHASED: return 'Receiving';
    }
  }

}

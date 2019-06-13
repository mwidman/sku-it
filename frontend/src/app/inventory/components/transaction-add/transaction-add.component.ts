import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { take, map } from 'rxjs/operators';

import * as fromInventory from '../../reducers';
import { TxType } from '../../models/transaction';
import { Sku } from '../../models/sku';
import { AddTransaction } from '../../actions/transaction.actions';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss']
})
export class TransactionAddComponent implements OnInit, OnDestroy {

  txForm: FormGroup = new FormGroup({
    client: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(0)], (ctrl) => this.checkSkuQuantity(ctrl)),
    total_cost: new FormControl('', [Validators.min(0)]),
  });
  txType: string;
  sku$: Observable<Sku>;
  private formSub: Subscription;

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

  ngOnDestroy() {

  }

  onSubmit() {
    if(this.txForm.valid) {
      const transaction = { ...this.txForm.value, tx_type: this.txType.toUpperCase() };
      console.warn(transaction);
      this.store.dispatch(new AddTransaction(transaction));
    }
  }

  hasError(controlName: string, errorName: string) {
    return this.txForm.controls[controlName].hasError(errorName);
  }

  convertTxType(): string {
    switch(this.txType) {
      case TxType.SOLD: return 'Shipping';
      case TxType.PURCHASED: return 'Receiving';
    }
  }

  checkSkuQuantity(ctrl: AbstractControl): Observable<null|ValidationErrors> {
    return this.sku$.pipe(
      take(1),
      map((sku) => {
        if(this.txType == TxType.SOLD &&
          (sku.current_quantity - ctrl.value <= 0)) {
          return { negativeQuantity: true };
        }
        else {
          return null;
        }
      })
    )

  }

}

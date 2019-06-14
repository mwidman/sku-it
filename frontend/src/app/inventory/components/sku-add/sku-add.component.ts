import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import * as fromInventory from '../../reducers';
import { AddSku, SkuActions, AddSkuSuccess } from '../../actions/sku.actions';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sku-add',
  templateUrl: './sku-add.component.html',
  styleUrls: ['./sku-add.component.scss']
})
export class SkuAddComponent implements OnInit, OnDestroy {

  skuForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    base_units: new FormControl('', [Validators.required, Validators.maxLength(24)]),
    current_quantity: new FormControl(0, [Validators.min(0)]),
  });

  errors$: Observable<object>;
  adding$: Observable<boolean>;

  actionSubcription = new Subscription();

  constructor(
    private store: Store<fromInventory.State>,
    private actionSubject: ActionsSubject,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit() {
    this.errors$ = this.store.pipe(
      select(fromInventory.getSkuAddErrors)
    );
    this.adding$ = this.store.pipe(
      select(fromInventory.getSkuAdding)
    );
    this.actionSubcription = this.actionSubject.pipe( 
      filter(action => action.type == SkuActions.ADD_SKU_SUCCESS)
    )
    .subscribe((action) => {
      const { name } = (<AddSkuSuccess>action).payload;
      this.snackBar.open(`Sku ${name} created successfully`, '', { duration: 2000 })
    })
  }

  ngOnDestroy() {
    this.actionSubcription.unsubscribe();
  }

  onSubmit() {
    if(this.skuForm.valid) {
      const sku = this.skuForm.value;
      console.warn(sku);
      this.store.dispatch(new AddSku(sku));
    }
  }

  hasError(controlName: string, errorName: string) {
    return this.skuForm.controls[controlName].hasError(errorName);
  }
}

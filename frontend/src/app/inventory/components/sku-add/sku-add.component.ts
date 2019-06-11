import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromInventory from '../../reducers';
import { AddSku } from '../../actions/sku.actions';

@Component({
  selector: 'app-sku-add',
  templateUrl: './sku-add.component.html',
  styleUrls: ['./sku-add.component.scss']
})
export class SkuAddComponent implements OnInit {

  skuForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    base_units: new FormControl('', [Validators.required, Validators.maxLength(24)]),
    current_quantity: new FormControl(0, [Validators.min(0)]),
  });

  constructor(private store: Store<fromInventory.State>) { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.skuForm.valid) {
      const sku = this.skuForm.value;
      console.warn(sku);
      //this.store.dispatch(new AddSku(sku));
    }
  }

  hasError(controlName: string, errorName: string) {
    return this.skuForm.controls[controlName].hasError(errorName);
  }
}

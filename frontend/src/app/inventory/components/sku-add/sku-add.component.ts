import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sku-add',
  templateUrl: './sku-add.component.html',
  styleUrls: ['./sku-add.component.scss']
})
export class SkuAddComponent implements OnInit {

  skuForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    baseUnits: new FormControl(''),
    currentQuantity: new FormControl(0),
  });

  constructor() { }

  ngOnInit() {
  }

}

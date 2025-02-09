import { Component, Input } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent  extends BaseComponent {
  constructor(spinner:NgxSpinnerService) {
    super(spinner);
    this.showSpinner(SpinnerType.Timer)
  }

}

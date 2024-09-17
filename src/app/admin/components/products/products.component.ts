import { Component, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { CreateProduct } from '../../../contracts/models/products/create-product';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent {

  constructor(spinner:NgxSpinnerService,private httpClientService:HttpClientService) {
    super(spinner);
    this.showSpinner(SpinnerType.Fire)
  }
  @ViewChild(ListComponent) listCompenet
  createdProduct(product:CreateProduct){
     this.listCompenet.getProducts()
  }

  
}

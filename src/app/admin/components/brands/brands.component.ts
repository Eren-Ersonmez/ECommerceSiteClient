import { Component, ViewChild } from '@angular/core';
import { BaseDialog } from '../../../dialogs/base/base-dialog';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  constructor(private baseDialog:BaseDialog){}
  @ViewChild(ListComponent) listCompenet
  createdBrand(brand){
    debugger;
     this.listCompenet.getBrands()
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ProductComponent } from './product/product.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductsComponent,
    ListComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:ProductsComponent
      },
      {
        path:"product",
        component:ProductComponent
      }
    ]),
    FormsModule
  ]
})
export class ProductsModule { }

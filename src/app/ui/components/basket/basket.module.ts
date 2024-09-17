import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { RouterModule } from '@angular/router';
import { DeleteDirectiveModule } from '../../../directives/admin/delete-directive/delete-directive.module';



@NgModule({
  declarations: [
    BasketComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:BasketComponent
      }
    ]),
    DeleteDirectiveModule
  ]
})
export class BasketModule { }

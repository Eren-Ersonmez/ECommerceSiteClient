import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards.component';
import { RouterModule } from '@angular/router';
import { DeleteDirectiveModule } from '../../../../../directives/admin/delete-directive/delete-directive.module';



@NgModule({
  declarations: [
    CardsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:CardsComponent
      },
    ]),
    DeleteDirectiveModule
  ]
})
export class CardsModule { }

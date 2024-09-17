import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IbansComponent } from './ibans.component';
import { RouterModule } from '@angular/router';
import { DeleteDirectiveModule } from '../../../../../directives/admin/delete-directive/delete-directive.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    IbansComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:IbansComponent
      },
    ]),
    DeleteDirectiveModule,
    FormsModule
  ]
})
export class IbansModule { }

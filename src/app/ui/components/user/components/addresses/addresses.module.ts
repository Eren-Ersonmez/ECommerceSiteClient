import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressesComponent } from './addresses.component';
import { RouterModule } from '@angular/router';
import { DeleteDirectiveModule } from '../../../../../directives/admin/delete-directive/delete-directive.module';



@NgModule({
  declarations: [
    AddressesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:AddressesComponent
      },
    ]),
    DeleteDirectiveModule
  ]
})
export class AddressesModule { }

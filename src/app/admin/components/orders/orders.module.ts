import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDirective } from '../../../directives/admin/delete-directive/delete.directive';
import { DeleteDirectiveModule } from '../../../directives/admin/delete-directive/delete-directive.module';



@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:OrdersComponent
      }
    ]),
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSidenavModule,
    MatTableModule, 
    MatPaginatorModule,
    DeleteDirectiveModule
  ]
})
export class OrdersModule { }

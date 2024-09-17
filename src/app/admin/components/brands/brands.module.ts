import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDirectiveModule } from '../../../directives/admin/delete-directive/delete-directive.module';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    BrandsComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,   
    RouterModule.forChild([
      {
        path:"",
        component:BrandsComponent
      }
    ]),
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatTableModule, 
    MatPaginatorModule,
    DeleteDirectiveModule,
    MatSelectModule,
  ]
})
export class BrandsModule { }

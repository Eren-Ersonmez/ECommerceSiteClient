import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDirectiveModule } from '../../../directives/admin/delete-directive/delete-directive.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    RolesComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:RolesComponent
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
export class RolesModule { }

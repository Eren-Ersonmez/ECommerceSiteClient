import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDirectiveModule } from '../../../directives/admin/delete-directive/delete-directive.module';
import { FileUploadModule } from '../../../services/common/file-upload/file-upload.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CategoriesComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:CategoriesComponent
      }
    ]),
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatTableModule, 
    MatPaginatorModule,
    DeleteDirectiveModule,
  ],
  exports:[
    CreateComponent
  ]
})
export class CategoriesModule { }

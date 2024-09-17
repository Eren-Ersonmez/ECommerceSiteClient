import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ListComponent } from './list/list.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';

import { FileUploadModule } from '../../../services/common/file-upload/file-upload.module';
import { DeleteDirectiveModule } from '../../../directives/admin/delete-directive/delete-directive.module';
@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:ProductsComponent
      }
    ]),
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSidenavModule,
    MatTableModule, 
    MatPaginatorModule,
    FileUploadModule,
    DeleteDirectiveModule
  ],
  exports:[
    CreateComponent
  ]
})
export class ProductsModule { }

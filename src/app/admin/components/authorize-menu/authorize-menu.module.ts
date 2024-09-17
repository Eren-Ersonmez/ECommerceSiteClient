import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeMenuComponent } from './authorize-menu.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AuthorizeMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
         path:"",
         component:AuthorizeMenuComponent
        }
      ])
  ]
})
export class AuthorizeMenuModule { }

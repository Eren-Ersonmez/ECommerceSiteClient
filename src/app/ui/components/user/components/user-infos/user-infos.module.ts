import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfosComponent } from './user-infos.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserInfosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:UserInfosComponent
      },
    ]),
    ReactiveFormsModule
  ]
})
export class UserInfosModule { }

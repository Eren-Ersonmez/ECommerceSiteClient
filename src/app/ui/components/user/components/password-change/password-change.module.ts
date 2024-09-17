import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PasswordChangeComponent } from './password-change.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PasswordChangeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:PasswordChangeComponent
      },
    ]),
    FormsModule
  ]
})
export class PasswordChangeModule { }

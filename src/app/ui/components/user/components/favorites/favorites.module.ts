import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:"",
        component:FavoritesComponent
      },
    ])
  ]
})
export class FavoritesModule { }

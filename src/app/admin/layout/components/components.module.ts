import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    HeaderComponent,
    SideBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule
    
  ],
  exports:[
    HeaderComponent,
    SideBarComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }

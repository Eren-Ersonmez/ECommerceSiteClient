import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { AddressesModule } from './components/addresses/addresses.module';
import { OrdersModule } from './components/orders/orders.module';
import { CardsModule } from './components/cards/cards.module';
import { FavoritesModule } from './components/favorites/favorites.module';
import { IbansComponent } from './components/ibans/ibans.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { UserInfosComponent } from './components/user-infos/user-infos.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LayoutModule,
    OrdersModule,
    AddressesModule,
    CardsModule,
    FavoritesModule
  ]
})
export class UserModule { }

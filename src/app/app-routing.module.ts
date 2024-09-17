import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { LayoutComponent as x } from './ui/components/user/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { authGuard } from './guards/common/auth.guard';

const routes: Routes = [
  {
    path:"admin",
    component:LayoutComponent,
    children:[
      {
        path:"customers",
        loadChildren:()=>import("../app/admin/components/customers/customers.module").then(module=>module.CustomersModule),
        canActivate:[authGuard]
      },
      {
        path:"products",
        loadChildren:()=>import("../app/admin/components/products/products.module").then(module=>module.ProductsModule),
        canActivate:[authGuard]
      },
      {
        path:"categories",
        loadChildren:()=>import("../app/admin/components/categories/categories.module").then(module=>module.CategoriesModule),
        canActivate:[authGuard]
      },
      {
        path:"orders",
        loadChildren:()=>import("../app/admin/components/orders/orders.module").then(module=>module.OrdersModule),
        canActivate:[authGuard]
      },
      {
       path:"authorize-menu",
       loadChildren:()=>import("../app/admin/components/authorize-menu/authorize-menu.module").then(module=>module.AuthorizeMenuModule),
       canActivate:[authGuard]
      },
      {
        path:"roles",
        loadChildren:()=>import("../app/admin/components/roles/roles.module").then(module=>module.RolesModule),
        canActivate:[authGuard]
      },
      {
        path:"users",
        loadChildren:()=>import("../app/admin/components/users/users.module").then(module=>module.UsersModule),
        canActivate:[authGuard]
      },
      {
        path:"brands",
        loadChildren:()=>import("../app/admin/components/brands/brands.module").then(module=>module.BrandsModule),
        canActivate:[authGuard]
      },
      {
        path:"",
        component:DashboardComponent,
        canActivate:[authGuard]
      }
    ],
    canActivate:[authGuard]
  },
  {
    path:"user",
    component:x,
    children:[
      {
        path:"orders",
        loadChildren:()=>import("../app/ui/components/user/components/orders/orders.module").then(module=>module.OrdersModule)
      },
      {
        path:"favorites",
        loadChildren:()=>import("../app/ui/components/user/components/favorites/favorites.module").then(module=>module.FavoritesModule)
      },
      {
        path:"addresses",
        loadChildren:()=>import("../app/ui/components/user/components/addresses/addresses.module").then(module=>module.AddressesModule)
      },
      {
        path:"cards",
        loadChildren:()=>import("../app/ui/components/user/components/cards/cards.module").then(module=>module.CardsModule)
      },
      {
        path:"userInfos",
        loadChildren:()=>import("../app/ui/components/user/components/user-infos/user-infos.module").then(module=>module.UserInfosModule)
      },
      {
        path:"ibans",
        loadChildren:()=>import("../app/ui/components/user/components/ibans/ibans.module").then(module=>module.IbansModule)
      },
      {
        path:"passwordChange",
        loadChildren:()=>import("../app/ui/components/user/components/password-change/password-change.module").then(module=>module.PasswordChangeModule)
      }
    ]
  },
  {
    path:"products",
    loadChildren:()=>import("../app/ui/components/products/products.module").then(module=>module.ProductsModule)
  },
  {
    path:"basket",
    loadChildren:()=>import("../app/ui/components/basket/basket.module").then(module=>module.BasketModule)
  },
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"register",
    loadChildren:()=>import("../app/ui/components/register/register.module").then(module=>module.RegisterModule)
  },
  {
    path:"login",
    loadChildren:()=>import("../app/ui/components/login/login.module").then(module=>module.LoginModule)
  },
  {
    path:"orders",
    loadChildren:()=>import("../app/ui/components/orders/orders.module").then(module=>module.OrdersModule)
  },
  {
    path:"passwordReset",
    loadChildren:()=>import("../app/ui/components/password-reset/password-reset.module").then(module=>module.PasswordResetModule)
  },
  {
    path:"updatePassword/:userId/:resetToken",
    loadChildren:()=>import("../app/ui/components/update-password/update-password.module").then(module=>module.UpdatePasswordModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

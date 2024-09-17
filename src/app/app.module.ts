import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BaseDialog } from './dialogs/base/base-dialog';
import { DialogModule } from './dialogs/dialog.module';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './services/common/authInterceptor';
import { LoginComponent } from './ui/components/login/login.component';
import { LoginModule } from './ui/components/login/login.module';
import { FacebookLoginProvider, GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';


@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        DynamicLoadComponentDirective,
    ],
    bootstrap: [AppComponent], imports: [
        BrowserModule,
        AppRoutingModule,
        AdminModule,
        UiModule,
        LoginModule,
        ToastrModule.forRoot(),
        SocialLoginModule,
        GoogleSigninButtonModule,
        NgxSpinnerModule,
        DialogModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: () => localStorage.getItem("accessToken"),
                allowedDomains: ['localhost:7002'],
            }
        })], providers: [
        provideClientHydration(),
        provideAnimationsAsync(),
        {
            provide: "baseUrl",
            useValue: "https://localhost:7002/api",
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide:HTTP_INTERCEPTORS,
            useClass:HttpErrorHandlerInterceptorService,
            multi:true
        },
        {
            provide: "SocialAuthServiceConfig",
            useValue: {
              autoLogin: false,
              providers: [
                {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider("564494141219-k8bkbicq677gfiegf47nbpgjva53dnuo.apps.googleusercontent.com")
                },
                {
                  id: FacebookLoginProvider.PROVIDER_ID,
                  provider: new FacebookLoginProvider('757781686364855')
                }
              ],
              onError: err => console.log(err)
            } as SocialAuthServiceConfig
          },
        BaseDialog,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }

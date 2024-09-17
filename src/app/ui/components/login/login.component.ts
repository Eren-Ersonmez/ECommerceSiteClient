import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import {  NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../services/ui/custom-toastr.service';
import {  AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserAuthService } from '../../../services/common/models/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(
    spinner:NgxSpinnerService,
    private userAuthService:UserAuthService,
    private toastr:CustomToastrService,
    private authService:AuthService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private socialAuthService: SocialAuthService,
  ){
    socialAuthService.authState.subscribe((user: SocialUser) => {
      spinner.show(SpinnerType.BallSpinFade)
      this.loginSocialMedia(user)
      
    });

    super(spinner)
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinFade)
  }
 async login(email:string,password:string)
  {
    this.showSpinner(SpinnerType.Fire)
    const token=await this.userAuthService.loginUser(email,password,()=>{
    this.hideSpinner(SpinnerType.Fire)
    this.toastr.message("Giriş Başarılı","Başarılı",{
      toastrMessagePosition:ToastrMessagePosition.TopRight,
      toastrMessageType:ToastrMessageType.Success
    })
    },()=>{
      this.hideSpinner(SpinnerType.Fire)
      this.toastr.message("email yada şifre hatalı","Giriş Başarırız",{
       toastrMessagePosition:ToastrMessagePosition.TopRight,
       toastrMessageType:ToastrMessageType.Error
      })
      return;
    })
    this.authService.identityCheck()
    this.activatedRoute.queryParams.subscribe(params=>{
      const returnUrl:string=params["returnUrl"]
      if(returnUrl){
    
        this.router.navigate([returnUrl])
      }
      this.router.navigate([""]);
     })
  }
  facebookSignIn(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  }
  async loginSocialMedia(user:SocialUser){
    this.userAuthService.loginSocialMedia(user,()=>{
      this.hideSpinner(SpinnerType.BallSpinFade)
      this.toastr.dismissLastToast()
      this.toastr.message("Giriş Başarılı","Başarılı",{
        toastrMessagePosition:ToastrMessagePosition.TopRight,
        toastrMessageType:ToastrMessageType.Success
      })
      this.authService.identityCheck()
      this.activatedRoute.queryParams.subscribe(params=>{
        const returnUrl:string=params["returnUrl"]
        if(returnUrl){
      
          this.router.navigate([returnUrl])
        }
        this.router.navigate([""]);
       })
    },()=>{
      this.hideSpinner(SpinnerType.BallSpinFade)
      this.toastr.dismissLastToast()
      this.toastr.message("email yada şifre hatalı","Giriş Başarırız",{
        toastrMessagePosition:ToastrMessagePosition.TopRight,
        toastrMessageType:ToastrMessageType.Error
       })
       
    })

  }
}

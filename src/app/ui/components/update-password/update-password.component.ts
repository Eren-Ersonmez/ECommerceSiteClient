import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../services/ui/custom-toastr.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {

state:boolean;
  constructor(spinner:NgxSpinnerService,
    private userAuthService:UserAuthService,
    private activatedRoute:ActivatedRoute,
    private toastr:CustomToastrService,
  private router:Router) {
    super(spinner);
    
  }
async ngOnInit() {
  this.showSpinner(SpinnerType.Fire)
    this.activatedRoute.params.subscribe({
      next:async params=>{
        const userId=params["userId"]
        const resetToken=params["resetToken"]
        this.state=(await this.userAuthService.verifyResetToken(resetToken,userId,()=>{
          this.hideSpinner(SpinnerType.Fire);
        })).data
      }
    });
  }

 async updatePassword(Password:string,PasswordConfirm:string){
     this.showSpinner(SpinnerType.BallSpinRotate)
     if(Password!=PasswordConfirm){
      this.hideSpinner(SpinnerType.BallSpinRotate)
        this.toastr.message("Sifreler birbiriyle eşleşmiyor","Şifre Uyumsuz",{
          toastrMessagePosition:ToastrMessagePosition.TopRight,
          toastrMessageType:ToastrMessageType.Warning
        })
     }else{
      this.hideSpinner(SpinnerType.BallSpinRotate)
      this.activatedRoute.params.subscribe({
        next:async params=>{
          const userId=params["userId"]
          const resetToken=params["resetToken"]
          await this.userAuthService.updatePassword(resetToken,userId,Password,()=>{
            this.toastr.message("Şifre başarılı bir şekilde güncellendi","Başarılı",{
              toastrMessagePosition:ToastrMessagePosition.TopRight,
              toastrMessageType:ToastrMessageType.Success
            })
            this.router.navigate(["/login"])
          },(error)=>{
            this.toastr.message(error[0],"Başarısız",{
              toastrMessagePosition:ToastrMessagePosition.TopRight,
              toastrMessageType:ToastrMessageType.Error
            })
          })
        }
      })
     }
  }
}

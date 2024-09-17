import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService,private userAuthService:UserAuthService,private toastr:CustomToastrService) {
    super(spinner);
    
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.Timer);
  }
  async passwordReset(email:string){
       this.showSpinner(SpinnerType.LineSpinClockwiseFadeRotating)
       await this.userAuthService.passwordReset(email,()=>{
       this.hideSpinner(SpinnerType.LineSpinClockwiseFadeRotating)
       this.toastr.message("Email başarılı bir şekilde gönderildi","Başarılı",{
        toastrMessagePosition:ToastrMessagePosition.TopRight,
        toastrMessageType:ToastrMessageType.Success
       })
       })
  }
}

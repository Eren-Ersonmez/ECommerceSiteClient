import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../../../../../services/common/models/user-auth.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.scss'
})
export class PasswordChangeComponent {

  constructor(private userAuthService:UserAuthService,private toastr:CustomToastrService){}

async onSubmit(frm:NgForm){
  if(frm.valid){
   const formValue=frm.value;
   await this.userAuthService.updatePassword2(formValue.oldPassword,formValue.newPassword,()=>{
    this.toastr.message("Şifreniz başarıyla güncellendi","Başarılı",{
      toastrMessagePosition:ToastrMessagePosition.TopRight,
      toastrMessageType:ToastrMessageType.Success
    })
   },(errors)=>{
    this.toastr.message(errors[0],"Başarısız",{
      toastrMessagePosition:ToastrMessagePosition.TopRight,
      toastrMessageType:ToastrMessageType.Error
    })
   })
  }
  }
}

import { Component } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../../services/common/models/user.service';
import { UpdateApplicationUser } from '../../../../../contracts/models/applicationUser/update-application-user';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrl: './user-infos.component.scss'
})
export class UserInfosComponent {

  constructor(private userService:UserService,private toastr:CustomToastrService){}

  frmUserInfo=new FormGroup({
    name:new FormControl('',[Validators.required]),
    surname:new FormControl('',[Validators.required]),
    birthDay:new FormControl('',[Validators.required]),
    gender:new FormControl('',[Validators.required]),
    phoneNumber:new FormControl('',[Validators.required]),
  });

  async onSubmit(){
    if(this.frmUserInfo.valid){
     const formValue=this.frmUserInfo.value;
     let user=new UpdateApplicationUser();
     user.birthDay=formValue.birthDay;
     user.gender=formValue.gender;
     user.name=formValue.name;
     user.surname=formValue.surname;
     user.phoneNumber=formValue.phoneNumber;
     await this.userService.updateUserInfo(user,()=>{
          this.toastr.message("Bilgiler başarılı bir şekilde güncellendi","Başarılı",{
            toastrMessagePosition:ToastrMessagePosition.TopRight,
            toastrMessageType:ToastrMessageType.Success
          })
     },()=>{
      this.toastr.message("Bilgiler güncellenirken bir hata oluştu ","Başarısız",{
        toastrMessagePosition:ToastrMessagePosition.TopRight,
        toastrMessageType:ToastrMessageType.Error
      })
     })
    }
  }
}

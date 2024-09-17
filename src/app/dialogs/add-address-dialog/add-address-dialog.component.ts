import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../services/common/models/address.service';
import { CreateAddress } from '../../contracts/models/address/create-address';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../services/ui/custom-toastr.service';
import { SpinnerType } from '../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-address-dialog',
  templateUrl: './add-address-dialog.component.html',
  styleUrl: './add-address-dialog.component.scss'
})
export class AddAddressDialogComponent {

  constructor(private addressService:AddressService,private toastr:CustomToastrService,private spinner:NgxSpinnerService){}

  addressForm=new FormGroup({
    title:new FormControl('',[Validators.required]),
    name:new FormControl('',[Validators.required]),
    surname:new FormControl('',[Validators.required]),
    content:new FormControl('',[Validators.required]),
    city:new FormControl('',[Validators.required]),
    district:new FormControl('',[Validators.required]),
    postalCode:new FormControl('',[Validators.required]),
    phoneNumber:new FormControl('',[Validators.required]),
  })
async onSubmit(){
    if(this.addressForm.valid){
      this.spinner.show(SpinnerType.BallSpinFade)
      const formValue=this.addressForm.value;
      let address:CreateAddress=new CreateAddress();
      address.title=formValue.title;
      address.addressOwnerName=formValue.name;
      address.addressOwnerSurname=formValue.surname;
      address.city=formValue.city;
      address.district=formValue.district;
      address.content=formValue.content;
      address.phoneNumber=formValue.phoneNumber;
      address.postalCode=formValue.postalCode;
     const response= await this.addressService.addAddress(address) 
     if(response.data){
        this.toastr.message("Adres başarıyla eklendi","Başarılı",{
          toastrMessagePosition:ToastrMessagePosition.TopRight,
          toastrMessageType:ToastrMessageType.Success
        })
     }else{
      this.toastr.message(response.errors[0],"Başarısız",{
        toastrMessagePosition:ToastrMessagePosition.TopRight,
        toastrMessageType:ToastrMessageType.Error
      })
     }
     this.spinner.hide(SpinnerType.BallSpinFade)
    }
  }
}

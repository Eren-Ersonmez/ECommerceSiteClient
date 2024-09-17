import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListAddress } from '../../contracts/models/address/list-address';
import { BaseDialog } from '../base/base-dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { AddressService } from '../../services/common/models/address.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-edit-address-dialog',
  templateUrl: './edit-address-dialog.component.html',
  styleUrl: './edit-address-dialog.component.scss'
})
export class EditAddressDialogComponent {

  id:string;
  applicationUserId:string
  address:ListAddress=new ListAddress();

  constructor(private baseDialog:BaseDialog,private spinner:NgxSpinnerService,private toastr:CustomToastrService,private addressService:AddressService){
    this.baseDialog.selectedId$.subscribe(address=>{
      this.id=address.id,
      this.applicationUserId=address.applicationUserId
    })
  }


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
      const formValue=this.addressForm.value
      this.address.addressOwnerName=formValue.name;
      this.address.addressOwnerSurname=formValue.surname;
      this.address.city=formValue.city;
      this.address.content=formValue.content;
      this.address.district=formValue.district;
      this.address.id=this.id;
      this.address.phoneNumber=formValue.phoneNumber;
      this.address.postalCode=formValue.postalCode;
      this.address.title=formValue.title;
      this.address.applicationUserId=this.applicationUserId
      await this.addressService.editAddress(this.address,()=>{
        this.toastr.message("Adres başarıyla güncellendi","Başarılı",{
          toastrMessagePosition:ToastrMessagePosition.TopRight,
          toastrMessageType:ToastrMessageType.Success
        })
      },()=>{
        this.toastr.message("Adres güncellenirken bir sorun oluştu daha sonra tekrar deneyiniz","Başarısız",{
          toastrMessagePosition:ToastrMessagePosition.TopRight,
          toastrMessageType:ToastrMessageType.Error
        })
      })
    }
    

     this.spinner.hide(SpinnerType.BallSpinFade)
  }
}

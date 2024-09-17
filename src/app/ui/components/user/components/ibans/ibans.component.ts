import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateIban} from '../../../../../contracts/models/ibans/create-iban';
import { HttpClientService } from '../../../../../services/common/http-client.service';
import { IbanService } from '../../../../../services/common/models/iban.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../../../services/ui/custom-toastr.service';
import { error } from 'console';
import { Iban } from '../../../../../contracts/models/ibans/iban';

@Component({
  selector: 'app-ibans',
  templateUrl: './ibans.component.html',
  styleUrl: './ibans.component.scss'
})
export class IbansComponent implements OnInit {

  ibansClick:boolean=false;
  ibans:Iban[]=[];

  constructor(private ibanService:IbanService,private toastr:CustomToastrService){}
  
  async ngOnInit() {
    await this.getIbans();
  }

  ibansClickChange(value:boolean){
    this.ibansClick=value;
  }
async getIbans(){
     this.ibans=(await this.ibanService.getUserIbans()).data
  }
  async onSubmit(form:NgForm){
     const formValue=form.value;
     let iban=new CreateIban();
     iban.name=formValue.name;
     iban.ibanNumber=formValue.iban.replace(/\s+/g, "")
     await this.ibanService.addIban(iban,()=>{
        this.toastr.message("İban başarıyla eklendi","Başarılı",{
          toastrMessageType:ToastrMessageType.Success,
          toastrMessagePosition:ToastrMessagePosition.TopRight
        })
     },(error)=>{
      this.toastr.message(error,"Başarısız",{
        toastrMessageType:ToastrMessageType.Error,
        toastrMessagePosition:ToastrMessagePosition.TopRight
      })
     })
  }
}

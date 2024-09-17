import { Component, OnInit } from '@angular/core';
import { ListAddress } from '../../../../../contracts/models/address/list-address';
import { AddressService } from '../../../../../services/common/models/address.service';
import { BaseDialog } from '../../../../../dialogs/base/base-dialog';
import { AddAddressDialogComponent } from '../../../../../dialogs/add-address-dialog/add-address-dialog.component';
import { EditAddressDialogComponent } from '../../../../../dialogs/edit-address-dialog/edit-address-dialog.component';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss'
})
export class AddressesComponent implements OnInit {

  addresses:ListAddress[]=[];

  constructor(private addressService:AddressService,private baseDialog:BaseDialog){}

async ngOnInit(){
   await this.getAddresses();
  }

 async addAddress(){
   this.baseDialog.openDialog(AddAddressDialogComponent,async()=>{
    await this.getAddresses();
   })
  }
 async getAddresses(){
  this.addresses=(await this.addressService.getUserAddresses()).data
  }
  editAddress(id:string,applicationUserId:string){
    this.baseDialog.setSelectedId({id,applicationUserId})
    this.baseDialog.openDialog(EditAddressDialogComponent,async()=>{})
  }
}

import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateAddress } from '../../../contracts/models/address/create-address';
import { firstValueFrom } from 'rxjs';
import { CustomResponse } from '../../../contracts/common/custom-response';
import { ListAddress } from '../../../contracts/models/address/list-address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClientService:HttpClientService) { }

async addAddress(createAddress:CreateAddress){
  const payload = {
    AddressCreateDto: createAddress
  };
    const result=this.httpClientService.post<CustomResponse<ListAddress>|any>({
      controller:"addresses"
    },payload)
    
    return await firstValueFrom(result) as CustomResponse<ListAddress>;
  }

async getAddress(id:string){
  const result=this.httpClientService.get<CustomResponse<ListAddress>|any>({
    controller:"addresses"
  },id)
  return await firstValueFrom(result) as CustomResponse<ListAddress>;
}

async getUserAddresses(){
  const result=this.httpClientService.get<CustomResponse<ListAddress[]>>({
    controller:"addresses",
    action:"GetUserAddresses"
  })
 return await firstValueFrom(result)
}

async editAddress(address:ListAddress,succesCallBack?: () => void, errorCallBack?: (errormessage: string) => void){
  const result=this.httpClientService.put<CustomResponse<boolean>|any>({
    controller:"addresses"
  },address)
  const response=await firstValueFrom(result) as CustomResponse<boolean>
  if(response.data==true){
     succesCallBack();
  }else{
     errorCallBack(response.errors[0])
  }
}
}


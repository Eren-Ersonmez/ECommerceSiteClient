import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateIban } from '../../../contracts/models/ibans/create-iban';
import { CustomResponse } from '../../../contracts/common/custom-response';
import { Iban } from '../../../contracts/models/ibans/iban';
import {  firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IbanService {

  constructor(private httpClientService:HttpClientService) { }

  async addIban(iban:CreateIban,succesCallBack?: () => void, errorCallBack?: (errormessage: string) => void){
    const result=this.httpClientService.post<CustomResponse<Iban>|any>({
      controller:"Ibans"
    },iban)
    const response=await firstValueFrom(result) as CustomResponse<Iban>
    if(response.data)
      succesCallBack();
    else
      errorCallBack(response.errors[0])
  }

  async getUserIbans(){
    const result=this.httpClientService.get<CustomResponse<Iban[]>>({
      controller:"ibans",
      action:"getUserIbans"
    })
  return await firstValueFrom(result)
  }
}

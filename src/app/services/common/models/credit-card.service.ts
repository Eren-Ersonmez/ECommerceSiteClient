import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateCreditCard } from '../../../contracts/models/creditCard/create-credit-card';
import { CustomResponse } from '../../../contracts/common/custom-response';
import { firstValueFrom } from 'rxjs';
import { ListCreditCard } from '../../../contracts/models/creditCard/list-credit-card';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(private httpClientService:HttpClientService) { }

  async addCreditCard(createCreditCard:CreateCreditCard){
    const payload = {
      CreateDto: createCreditCard
    };

    const result=this.httpClientService.post<CustomResponse<ListCreditCard>|any>({
      controller:"CreditCards",
    },payload)
   return await firstValueFrom(result) as CustomResponse<ListCreditCard>
  }
  async getUserCreditCard(){
    const result=this.httpClientService.get<CustomResponse<ListCreditCard[]>>({
      controller:"creditCards",
      action:"GetUserCreditCards"
    })
    return await firstValueFrom(result)
  }
}

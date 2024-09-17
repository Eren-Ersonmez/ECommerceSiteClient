import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateShoppingCart } from '../../../contracts/models/shoppingCart/create-shoppingCart';
import { firstValueFrom } from 'rxjs';
import { CustomResponse } from '../../../contracts/common/custom-response';
import { HttpHeaders } from '@angular/common/http';
import { ListShoppingCart } from '../../../contracts/models/shoppingCart/list-shoppingCart';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private httpClientService:HttpClientService) { }

  async addShoppingCart(createShoppingCart:CreateShoppingCart,succesCallBack?: () => void, errorCallBack?:(errorMessages)=>void)
  {
    const payload = {
      createDto: createShoppingCart
    };
      const result=this.httpClientService.post<CustomResponse<any>|any>({
      controller:"ShoppingCarts",
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-Type': 'application/json'
      })
    },payload)
    await firstValueFrom(result).then(()=>{
      succesCallBack()
    }).catch(()=>{
      errorCallBack(data)
    })
    
  }
  async getShoppingCart():Promise<CustomResponse<ListShoppingCart[]>>{
    const result=this.httpClientService.get<CustomResponse<ListShoppingCart[]>>({
      controller:"ShoppingCarts",
      action:"GetUsersShoppingCarts",
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-Type': 'application/json'
      })
    })
    return await firstValueFrom(result)
  }
  async updateShoppingCart(cart:ListShoppingCart){
    const payload = {
      UpdateShoppingCart: cart
    };
    
    const result =this.httpClientService.put({
      controller:"ShoppingCarts",
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-Type': 'application/json'
      })
    },payload)
    return await firstValueFrom(result)
  }
  async deleteShoppingCart(id:string){
    const result =this.httpClientService.delete({
      controller:"ShoppingCarts",
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-Type': 'application/json'
      })
    },id)
    return await firstValueFrom(result)
  }
}

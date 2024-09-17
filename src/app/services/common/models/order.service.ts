import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateOrder } from '../../../contracts/models/order/create-order';
import { CustomResponse } from '../../../contracts/common/custom-response';
import { ListOrder } from '../../../contracts/models/order/list-order';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDetails } from '../../../contracts/models/order/create-order-details';
import { OrderDetails } from '../../../contracts/models/order/order-details';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService:HttpClientService) { }

  async addOrder(createOrder:CreateOrder,successCallBack?:()=>void,errorCallBack?:(errorMessages)=>void){
    const result=this.httpClientService.post<CustomResponse<ListOrder>|any>({
      controller:"orders"
    },createOrder)
    debugger;
    const  response= await firstValueFrom(result) as CustomResponse<ListOrder>

    if(response.data){
      successCallBack();
    }else{
      errorCallBack(response.errors);
    }
    return response;
  }
  async addOrderDetails(createOrderDetails:CreateOrderDetails)
  {
    const payload = {
      CreateDto: createOrderDetails
    };
    const result=this.httpClientService.post<CustomResponse<CreateOrderDetails>|any>({
      controller:"OrderDetails"
    },payload)
    const response= await firstValueFrom(result) as CustomResponse<OrderDetails>
    return response;
  }
  async read(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errormessage: string) => void
  ): Promise<CustomResponse<ListOrder[]>> {
    const result = this.httpClientService.get<CustomResponse<ListOrder[]>>({
      controller: "orders",
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-Type': 'application/json'
      }),
      queryString: `Page=${page}&PageSize=${size}`
    })
     const datas= await firstValueFrom(result)
     if(datas.data){
      successCallBack()
     }else{
      errorCallBack("Beklenmeyen bir hata oluştu");
     }
    return datas
  }
  async getOrder(id:string,successCallBack?: () => void,
  errorCallBack?: (errormessage: string) => void): Promise<CustomResponse<ListOrder>> {
    const result=await this.httpClientService.get<CustomResponse<ListOrder>>({
      controller:"orders"
    },id)
   const datas= await firstValueFrom(result) as CustomResponse<ListOrder>
  return datas
  }
  async getOrderDetails(id:string){
     const result=this.httpClientService.get({
      controller:"OrderDetails",
     },id)
    const response= await firstValueFrom(result) as CustomResponse<OrderDetails>
    return response;
  }
  async GetByOrderIdOrderDetails(orderId:string){
    const result=this.httpClientService.get({
      controller:"OrderDetails",
      action:"GetByOrderIdOrderDetails",
      queryString:`OrderId=${orderId}`
    })
    const response=await firstValueFrom(result) as CustomResponse<OrderDetails[]>
    return response;
  }
  async changeOrderStatus(orderId:string,orderStatus:string){

    const result=this.httpClientService.put({
      controller:"orders",
      action:"UpdateOrderStatus"
    },{Id:orderId,OrderStatus:orderStatus})

    const response=await firstValueFrom(result)
  }
  async getUserOrder(){
    const result=this.httpClientService.get<CustomResponse<ListOrder[]>>({
      controller:"orders",
      action:"GetUserOrders"
    })
    return await firstValueFrom(result)
  }
}

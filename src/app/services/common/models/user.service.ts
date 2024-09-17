import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from '../../../entities/user';
import { firstValueFrom } from 'rxjs';
import { CustomResponse } from '../../../contracts/common/custom-response';
import { HttpHeaders } from '@angular/common/http';
import { ListApplicationUser } from '../../../contracts/models/applicationUser/list-application-user';
import { ListProduct } from '../../../contracts/models/products/list-product';
import { UpdateApplicationUser } from '../../../contracts/models/applicationUser/update-application-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService:HttpClientService) { }

 async createUser(user:User,successCallBack?:()=>void,errorCallBack?:(errorMessages)=>void){
  const payload = {
    dto: user
  };
   const result=this.httpClientService.post<CustomResponse<any>|any>({
    controller:"applicationUsers",
   },payload)

   const response= await firstValueFrom(result)  as Promise<CustomResponse<any>>
   if((await response).data){
    successCallBack()
   }
   else{
    errorCallBack((await response).errors)
   }
  
  }
  async read(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errormessage: string) => void
  ): Promise<CustomResponse<ListApplicationUser[]>> {
    const result = this.httpClientService.get<CustomResponse<ListApplicationUser[]>>({
      controller: "ApplicationUsers",
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
  async getUsersRoles(userId:string){
    const result=this.httpClientService.get<CustomResponse<string[]>>({
       controller:"ApplicationUsers"
    },userId)

   return await firstValueFrom(result) as CustomResponse<string[]>
  }
  async assignRoles(userId:string,roles:string[],successCallBack?:()=>void,errorCallBack?:(errorMessages)=>void){
    const result=this.httpClientService.post({
      controller:"ApplicationUsers",
      action:"AssignRoles"
    },{UserId:userId,Roles:roles})

    await firstValueFrom(result).then(()=>{
      successCallBack();
    }).catch(()=>{
      errorCallBack("Beklenmeyen bir hata oluştu");
    })
  }
 async addFavoriteProduct(productId:string,successCallBack?:()=>void,errorCallBack?:(errorMessages)=>void){
  const result=this.httpClientService.post<CustomResponse<boolean>|any>({
   controller:"ApplicationUsers",
   action:"AddFavoriteProduct"
  },{ productId })
 const response= await firstValueFrom(result) as CustomResponse<boolean>
 if(response.data)
   successCallBack();
 else
   errorCallBack(response.errors[0]);
 }
 async getFavoriteProducts(){
  const result=this.httpClientService.get<CustomResponse<ListProduct[]>>({
    controller:"ApplicationUsers",
    action:"GetUserFavoriteProducts"
  })
  return await firstValueFrom(result)
 }

 async updateUserInfo(updateApplicationUser:UpdateApplicationUser,successCallBack?:()=>void,errorCallBack?:(errorMessages)=>void){
  const result=this.httpClientService.put<CustomResponse<boolean>|any>({
    controller:"ApplicationUsers"
  },updateApplicationUser)

  const response=await firstValueFrom(result)
  if(response.data)
    successCallBack();
  else
    errorCallBack(response.errors[0]);
 }
}

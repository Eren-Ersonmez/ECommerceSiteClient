import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { SocialUser } from '@abacritt/angularx-social-login';
import { CustomResponse } from '../../../contracts/common/custom-response';
import { Token } from '../../../contracts/models/token';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService) { }

  async loginSocialMedia(user:SocialUser,successCallBack?:()=>void,errorCallBack?:(errorMessages:string[])=>void){
    const result= this.httpClientService.post<CustomResponse<Token>|SocialUser>({
      controller:"auth",
      action:"externallogin"
    },user)
    const token=await firstValueFrom(result) as CustomResponse<Token>
    if((await token).data){
      localStorage.setItem("accessToken",token.data.accessToken)
      localStorage.setItem("refreshToken",token.data.refreshToken)
      successCallBack()
    }
    else{
      errorCallBack((await token).errors)
     }
    }
  
   async loginUser(email:string,password:string,successCallBack?:()=>void,errorCallBack?:(errorMessages:string[])=>void){
      const result=this.httpClientService.post<CustomResponse<Token
      >|any>({
        controller:"auth",
        action:"login"
       },{
        email,
        password
       })
       const token = await firstValueFrom(result) as Promise<CustomResponse<Token>>
       if((await token).data){
        localStorage.setItem("accessToken",(await token).data.accessToken)
        localStorage.setItem("refreshToken",(await token).data.refreshToken)
        successCallBack()
       }
       else{
        errorCallBack((await token).errors)
       }
       return (await token).data;
    }
   async refreshTokenLogin(successCallBack?:()=>void,errorCallBack?:(errorMessages:string[])=>void):Promise<void>{
    const payload = {
      refreshToken: localStorage.getItem("refreshToken")
    };
    const result= this.httpClientService.post<CustomResponse<Token>|any>({
      controller:"auth",
      action:"refreshTokenLogin",
    },payload)
    const token=await firstValueFrom(result) as CustomResponse<Token>
    if((await token).data){
      localStorage.setItem("accessToken",token.data.accessToken)
      localStorage.setItem("refreshToken",token.data.refreshToken)
      successCallBack()
    }
    else{
      errorCallBack((await token).errors)
     }
   }
   async passwordReset(email:string,successCallBack?:()=>void,errorCallBack?:(errorMessages:string[])=>void){
      const result=this.httpClientService.post({
        controller:"auth",
        action:"PasswordReset"
      },{Email:email})

      await firstValueFrom(result).then(()=>{
        successCallBack();
      })
   }
   async verifyResetToken(resetToken:string,userId:string,successCallBack?:()=>void,errorCallBack?:(errorMessages:string[])=>void){
    const result=this.httpClientService.post<CustomResponse<boolean>|any>({
      controller:"auth",
      action:"verifyResetToken"
    },{ResetToken:resetToken,UserId:userId})
    const response=await firstValueFrom(result) as CustomResponse<boolean>
   if(response.data==true){
     successCallBack();
   }else{
    errorCallBack(response.errors);
   }
   return response;
   }
   async updatePassword(resetToken:string,userId:string,newPassword:string,successCallBack?:()=>void,errorCallBack?:(errorMessages:string[])=>void){
    const result=this.httpClientService.post<CustomResponse<any>|any>({
        controller:"auth",
        action:"UpdatePassword"
      },{ResetToken:resetToken,UserId:userId,NewPassword:newPassword})

      const response=await firstValueFrom(result) as CustomResponse<any>
      await firstValueFrom(result).then(()=>{
        successCallBack();
      }).catch(()=>{
        errorCallBack(response.errors);
      })
   }
   async updatePassword2(oldPassword:string,newPassword:string,successCallBack?:()=>void,errorCallBack?:(errorMessages:string[])=>void){
      const result=this.httpClientService.post<CustomResponse<boolean>|any>({
         controller:"ApplicationUsers",
         action:"UpdatePassword"
      },{OldPassword:oldPassword,NewPassword:newPassword})

     const response=await firstValueFrom(result) as CustomResponse<boolean>
     
     if(response.data)
      successCallBack();
     else
      errorCallBack(response.errors);
   }
}

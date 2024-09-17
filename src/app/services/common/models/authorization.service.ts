import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom } from 'rxjs';
import { CustomResponse } from '../../../contracts/common/custom-response';
import { ListRole } from '../../../contracts/models/roles/list-role';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private httpClientService:HttpClientService) { }


async assignRoles(roles:string[],endpointCode:string,menu?:string,successCallBack?: () => void,
errorCallBack?: (errormessage: string[]) => void){
  debugger;
  const result=this.httpClientService.post<CustomResponse<boolean>|any>({
     controller:"ApplicationServices",
  },{Roles:roles,EndpointCode:endpointCode,Menu:menu})

 const response= await firstValueFrom(result) as CustomResponse<boolean>
 if(response.data==true){
  successCallBack();
 }
 else{
  errorCallBack(response.errors);
 }
}
async selectedRoles(endpointCode:string){
  const result=this.httpClientService.post<CustomResponse<string[]>|any>({
    controller:"ApplicationServices",
    action:"getSelectedRolesOfEndpoint"
  },{EndpointCode:endpointCode})
  return await firstValueFrom(result) as CustomResponse<string[]>
}
}

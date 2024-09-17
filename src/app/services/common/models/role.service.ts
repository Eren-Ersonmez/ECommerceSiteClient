import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomResponse } from '../../../contracts/common/custom-response';
import { ListRole } from '../../../contracts/models/roles/list-role';
import { HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClientService: HttpClientService) { }

  async getRoles(){
    const result=this.httpClientService.get<CustomResponse<ListRole[]>>({
      controller:"roles",
      action:"getAllRoles"
    })
    return await firstValueFrom(result)
  }
  async read(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errormessage: string) => void
  ): Promise<CustomResponse<ListRole[]>> {
    const result = this.httpClientService.get<CustomResponse<ListRole[]>>({
      controller: "roles",
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
  async createRole(roleName:string,successCallBack?: () => void,
  errorCallBack?: (errormessage: string) => void){
    const result=this.httpClientService.post({
      controller:"roles"
    },{RoleName:roleName})
    
    await firstValueFrom(result).then(()=>{
      successCallBack();
    }).catch((errors)=>{
      errorCallBack(errors);
    })
  }
}

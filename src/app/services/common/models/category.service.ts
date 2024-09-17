import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomResponse } from '../../../contracts/common/custom-response';
import { firstValueFrom } from 'rxjs';
import { ListCategory } from '../../../contracts/models/categories/list-category';
import { CreateCategory } from '../../../contracts/models/categories/create-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpService:HttpClientService) { }

  async read(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errormessage: string) => void
  ): Promise<CustomResponse<ListCategory[]>> {
    const result = this.httpService.get<CustomResponse<ListCategory[]>>({
      controller: "categories",
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
  async create(category:CreateCategory,successCallBack?: () => void,
  errorCallBack?: () => void){
    const result=this.httpService.post<CustomResponse<ListCategory>|any>({
      controller:"categories"
    },{CreateDto:category})
  const response= await firstValueFrom(result) as CustomResponse<ListCategory>
  if(response.data){
    successCallBack()
  }else{
    errorCallBack()
  }
  }
  async edit(category:ListCategory,successCallBack?: () => void,
  errorCallBack?: () => void)
  {
    const result=this.httpService.put<CustomResponse<ListCategory>|any>({
      controller:"categories"
    },{Category:category})
  const response= await firstValueFrom(result) as CustomResponse<ListCategory>
  debugger;
  if(response.data){
    successCallBack()
  }else{
    errorCallBack()
  }
  }
}

import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomResponse } from '../../../contracts/common/custom-response';
import { HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Brand } from '../../../contracts/models/brands/brand';
import { CreateBrand } from '../../../contracts/models/brands/create-Brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClientService:HttpClientService) { }

  async read(page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errormessage: string) => void): Promise<CustomResponse<Brand[]>>{
    const result = this.httpClientService.get<CustomResponse<Brand[]>>({
      controller: "brands",
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

  async addBrand(createBrand:CreateBrand, successCallBack?: () => void,
  errorCallBack?: () => void){
    const result=this.httpClientService.post<CustomResponse<Brand>|any>({
      controller:"brands"
    },createBrand)
    const response= await firstValueFrom(result) as CustomResponse<Brand>
    if(response.data){
      successCallBack()
    }else{
      errorCallBack()
    }
  }

  async getCategoryBrands(categoryId:string){
    const result=this.httpClientService.get<CustomResponse<Brand[]>>({
      controller:"brands",
      action:"GetCategoryBrands",
      queryString:`categoryId=${categoryId}`
    })
    return await firstValueFrom(result)
  }
}

import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProductAttribute } from '../../../contracts/models/productAttributes/create-productAttribute';
import { CustomResponse } from '../../../contracts/common/custom-response';
import { ProductAttribute } from '../../../contracts/models/productAttributes/productAttribute';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductFeatureService {

  constructor(private httpClientService: HttpClientService) { }

  async getProductAttributes(productId:string) {
     const result=this.httpClientService.get<CustomResponse<ProductAttribute[]>>({
      controller:"productAttributes"
     },productId)
    return await firstValueFrom(result)
  }

  async addProductAttribute(createProductAttribute: CreateProductAttribute, successCallBack?: () => void,
    errorCallBack?: (errormessage: string) => void) {
    const result = this.httpClientService.post<CustomResponse<ProductAttribute> | any>({
      controller: "productAttributes"
    }, createProductAttribute)

   const response= await firstValueFrom(result) as CustomResponse<ProductAttribute>
   if(response.data){
    successCallBack();
   }else{
    errorCallBack(response.errors[0])
   }
  }
}

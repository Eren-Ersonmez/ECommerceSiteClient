import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from '../../../contracts/models/products/create-product';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CustomResponse } from '../../../contracts/common/custom-response';
import { ListProduct } from '../../../contracts/models/products/list-product';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: CreateProduct, succesCallBack?: () => void, errorCallBack?: (errormessage: string) => void) {
    const payload = {
      dto: product
    };
    this.httpClientService.post({
      controller: "products",
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-Type': 'application/json'
      })
      }, payload).subscribe(result => {
      succesCallBack()
    }, (errorResponse: HttpErrorResponse) => {
      console.error(errorResponse);
      const _error: { key: string, values: Array<string> }[] = errorResponse.error.errors;
      let message = "";
      for (let key in _error) {
        let value = _error[key];
        message += `${value}<br>`
      }
      errorCallBack(message)
    })
  }

  async read(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errormessage: string) => void
  ): Promise<CustomResponse<ListProduct[]>> {
    const result = this.httpClientService.get<CustomResponse<ListProduct[]>>({
      controller: "products",
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

  async delete(id: string) {
    var value = this.httpClientService.delete<CustomResponse<boolean>>({
      controller: "products",
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
        'Content-Type': 'application/json'
      })
    }, id)
    await firstValueFrom(value)
  }

  async updateStockQrCodeToProduct(productId:string,stock:number,succesCallBack?: () => void, errorCallBack?: (errormessage: string) => void){
    const result=this.httpClientService.put<CustomResponse<boolean>|any>({
         controller:"products",
         action:"updateStockQrCodeToProduct"
    },{ProductId:productId,Stock:stock})

    await firstValueFrom(result).then((response:CustomResponse<boolean>)=>{
      if(response.data==true){
        succesCallBack();
      }else{
        errorCallBack(response.errors[0]);
      }

    }).catch((errors)=>{
        errorCallBack(errors);
    })
  }

  async getProduct(productId:string){
    const result=this.httpClientService.get<CustomResponse<ListProduct>>({
     controller:"products"
    },productId)
   return await firstValueFrom(result)
  }

  async getCategoryProducts(categoryId:string){
     const result=this.httpClientService.get<CustomResponse<ListProduct[]>>({
        controller:"products",
        action:"getCategoryProducts",
        queryString:`CategoryId=${categoryId}`
     })
   return await firstValueFrom(result)
  }
  async getBrandProducts(brandId:string){
    const result=this.httpClientService.get<CustomResponse<ListProduct[]>>({
      controller:"products",
      action:"GetBrandProducts",
      queryString:`brandId=${brandId}`
   })
 return await firstValueFrom(result)
  }
  
}


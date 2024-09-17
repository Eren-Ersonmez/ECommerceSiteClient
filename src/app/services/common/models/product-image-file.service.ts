import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { CustomResponse } from '../../../contracts/common/custom-response';
import { ListProductFileImages } from '../../../contracts/files/list-product-file-images';

@Injectable({
  providedIn: 'root'
})
export class ProductImageFileService {

  constructor(private httpClientService:HttpClientService) { }

   async readImages(id:string,succesCallBack?:()=>void):Promise<CustomResponse<ListProductFileImages[]>>
   {
    const values:Observable<CustomResponse<ListProductFileImages[]>>= this.httpClientService.get<CustomResponse<ListProductFileImages[]>>({
      controller:"productImageFiles",
      queryString:`productId=${id}`
    })
    
    const images:CustomResponse<ListProductFileImages[]>= await firstValueFrom(values)
    succesCallBack()
    return images

  }
  async deleteImage(id:string,succesCallBack:()=>void){
   const deleteResult=this.httpClientService.delete({
      controller:"productImageFiles"
    },id)
    await firstValueFrom(deleteResult)
    succesCallBack()
  }
}

import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor(private httpClientService:HttpClientService) { }

async getQrCodeToProduct(productId:string){
  const result=this.httpClientService.get({
    controller:"products",
    action:"qrcode",
    responseType:"blob"
  },productId)

  return await firstValueFrom(result) as Blob
}
}

import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Menu } from '../../../contracts/models/menu';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientService:HttpClientService) { }

  async GetAuthorizeDefinitionEndpoints(){
    const result:Observable<Menu[]>=this.httpClientService.get<Menu[]>({
      controller:"ApplicationServices"
    })

   return await firstValueFrom(result)
  }
}
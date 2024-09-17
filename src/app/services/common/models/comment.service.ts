import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomResponse } from '../../../contracts/common/custom-response';
import { firstValueFrom } from 'rxjs';
import { Comment } from '../../../contracts/models/comment/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClientService:HttpClientService) { }

async addComment(productId:string,comment:string,succesCallBack?: () => void, errorCallBack?: (errormessage: string) => void){
    const result=this.httpClientService.post<CustomResponse<any>|any>({
      controller:"comments"
    },{ProductId:productId,CommentContent:comment})
  const response= await firstValueFrom(result) as CustomResponse<any>
  if(response.data){
     succesCallBack();
  }else{
    errorCallBack(response.errors[0])
  }

  }
async getProductComment(productId:string){
 const result=this.httpClientService.get<CustomResponse<Comment[]>>({
  controller:"comments",
  action:"GetProductComments",
  queryString:`productId=${productId}`
 })
  return await firstValueFrom(result)
}
async commentLiked(id: string, successCallBack?: () => void, errorCallBack?: () => void) {
  const result = this.httpClientService.put({
    controller: "comments",
    action: "LikedComment",
    queryString: `id=${id}`  
  });

  await firstValueFrom(result).then(() => {
    if (successCallBack) successCallBack();
  }).catch(() => {
    if (errorCallBack) errorCallBack();
  });
}

}

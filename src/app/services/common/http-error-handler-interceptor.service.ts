import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async, catchError, Observable, of, throwError } from 'rxjs';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor{

  constructor(private toastr:CustomToastrService,private userAuthService:UserAuthService) { }
 intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(error => {
        if(error.status==HttpStatusCode.Unauthorized){
            this.userAuthService.refreshTokenLogin(()=>{},()=>{
            this.toastr.message("Bu işlemi yapmaya yetkiniz yok","Yetkisiz İşlem",{
              toastrMessageType:ToastrMessageType.Error,
              toastrMessagePosition:ToastrMessagePosition.TopRight
            })
          }).then(data=>{
            this.toastr.message("Bu işlemi yapmaya yetkiniz yok","Yetkisiz İşlem",{
              toastrMessageType:ToastrMessageType.Error,
              toastrMessagePosition:ToastrMessagePosition.TopRight
            })
          })
        }
        else if(error.status==HttpStatusCode.InternalServerError){
          this.toastr.message("Sunucuda aksaklık oldu daha sonra deneyiniz","Sunucu Hatası",{
            toastrMessageType:ToastrMessageType.Error,
            toastrMessagePosition:ToastrMessagePosition.TopRight
          })
        }
        else if(error.status==HttpStatusCode.BadRequest){
          this.toastr.message("Geçersiz istek yapıldı","Geçersiz İstek",{
            toastrMessageType:ToastrMessageType.Error,
            toastrMessagePosition:ToastrMessagePosition.TopRight
          })
        }
        else if(error.status==HttpStatusCode.NotFound){
          this.toastr.message("Yapılan istek bulunamadı.","İstek Bulunamadı",{
            toastrMessageType:ToastrMessageType.Error,
            toastrMessagePosition:ToastrMessagePosition.TopRight
          })
        }
        else{
          this.toastr.message("Beklenmeyen bir hata oluştu.","Beklenmeyen Hata",{
            toastrMessageType:ToastrMessageType.Error,
            toastrMessagePosition:ToastrMessagePosition.TopRight
          })
        }
        return throwError(() => new Error(error.message))
      })
    );
  }
 
}

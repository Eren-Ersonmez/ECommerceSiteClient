import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {
  
  lastToastRef: ActiveToast<any> | null = null;
  constructor(private toastrService:ToastrService) { }

  message(message: string, title: string,toastrServiceOptions:Partial<CustomToastrOptions>){
     this.lastToastRef= this.toastrService[toastrServiceOptions.toastrMessageType](message,title,{
        positionClass:toastrServiceOptions.toastrMessagePosition,
       })
  }
  dismissLastToast() {
    if (this.lastToastRef) {
      this.toastrService.clear(this.lastToastRef.toastId);
      this.lastToastRef = null; 
    }
  }
  dismissAllToasts() {
    this.toastrService.clear();
  }
}
export class CustomToastrOptions{
  toastrMessageType:ToastrMessageType=ToastrMessageType.Success
  toastrMessagePosition:ToastrMessagePosition=ToastrMessagePosition.BottomRight
}
export enum ToastrMessageType{
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error"

}
export enum ToastrMessagePosition{
  TopRight = "toast-top-right",
  BottomRight = "toast-bottom-right",
  BottomLeft = "toast-bottom-left",
  TopLeft = "toast-top-left",
  TopFullWidth = "toast-top-full-width",
  BottomFullWidth = "toast-bottom-full-width",
  TopCenter = "toast-top-center",
  BottomCenter = "toast-bottom-center"

}
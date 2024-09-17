import { Injectable } from '@angular/core';
declare var alertify:any
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message:string,options:Partial<AlertifyOptions>){
    alertify.set('notifier','delay',options.delay);
    alertify.set('notifier','position',options.messagePosition);
    const m= alertify[options.messageType](message); 
    if(options.dismissOthers){
      m.dismissOthers();
    }
  }
  dissmissAll(){
    alertify.dismissAll();
  }
}
export class AlertifyOptions{
  messageType:AlertifyMessageType=AlertifyMessageType.Message
  messagePosition:AlertifyMessagePosition=AlertifyMessagePosition.BottomRigth
  delay:number=3
  dismissOthers: boolean = false;

}
export enum AlertifyMessageType{
   Error="error",
   Warning="warning",
   Message="message",
   Notify="notify",
   Success="success"
}
export enum AlertifyMessagePosition{
  TopLeft="top-left",
  TopRight="top-right",
  TopCenter="top-center",
  BottomLeft="bottom-left",
  BottomRigth="bottom-right",
  BottomCenter="bottom-center"
}
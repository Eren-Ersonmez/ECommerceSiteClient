import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {


  start(hubUrl:string) {
     const hubConnection= new HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

      hubConnection.start()
      .then(() => console.log('SignalR bağlantısı kuruldu')
    )
      .catch((err) => {
        console.log('SignalR bağlantısı hatası: ', err)
        setTimeout(()=>this.start(hubUrl),4000)
      });
    hubConnection.onreconnected(connectingId=>console.log("Reconnected"))
    hubConnection.onreconnecting(error=>console.log("Reconnecting"))
    hubConnection.onclose(error=>console.log("Close reconnecting"))
    return hubConnection
  }
  invoke(hubUrl:string,procedureName:string,message:any,successCalback?:(value)=>void,errorCalback?:(error)=>void){
    this.start(hubUrl).invoke(procedureName,message)
    .then(successCalback)
    .catch(errorCalback)
  }
  on(hubUrl,procedureName:string,callBack:(...message:any)=>void){
    this.start(hubUrl).on(procedureName,callBack)
  }
}

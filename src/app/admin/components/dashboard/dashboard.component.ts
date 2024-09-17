import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery';
import { HttpClientService } from '../../../services/common/http-client.service';
import { SignalRService } from '../../../services/common/signalR.service';
import { ReceiveFunctions } from '../../../constants/receive-functions';
import { HubUrls } from '../../../constants/hub-urls';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../../services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent implements OnInit {


  constructor(
    spinner:NgxSpinnerService,
    private httpService:HttpClientService,
    private signalRService:SignalRService,
    private alertfy:AlertifyService) {
    super(spinner);
    this.showSpinner(SpinnerType.BallSpinRotate)
  }
  ngOnInit(): void {
   
   this.signalRService.on(HubUrls.OrderHub,ReceiveFunctions.OrderAddedMessageReceiveFunction,message=>{
      this.alertfy.message(message,{
        delay:3,
        dismissOthers:true,
        messagePosition:AlertifyMessagePosition.TopRight,
        messageType:AlertifyMessageType.Success
      })
   })
  }
}

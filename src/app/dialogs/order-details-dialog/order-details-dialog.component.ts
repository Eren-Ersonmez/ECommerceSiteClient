import { Component, OnInit } from '@angular/core';
import { ListOrder } from '../../contracts/models/order/list-order';
import { OrderService } from '../../services/common/models/order.service';
import { BaseDialog } from '../base/base-dialog';
import { AddressService } from '../../services/common/models/address.service';
import { OrderStatus } from '../../constants/order-status';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrl: './order-details-dialog.component.scss',

})
export class OrderDetailsDialogComponent implements OnInit {
  id: string;
  role:boolean;
  public orderData:ListOrder[]=null
  constructor(
    private orderService:OrderService,
    private addressService:AddressService,
    private baseDialog:BaseDialog,
    private spinner:NgxSpinnerService){}
 async ngOnInit() {
  this.baseDialog.selectedId$.subscribe(x=>{
    this.id=x.id
    this.role=x.role
    })
    this.orderData = [await this.getOrderDetails()];
  }
 async getOrderDetails():Promise<ListOrder>{
  let order=(await this.orderService.getOrder(this.id)).data
  const address=await this.addressService.getAddress(order.addressId)
  order.address=address.data
  const orderDetails=await this.orderService.GetByOrderIdOrderDetails(order.id);
  order.orderDetails=orderDetails.data
  return order;
 } 
 getOrderStatus(item:ListOrder):string{
    switch(item.orderStatus){
      case OrderStatus.WaitingForOrderConfirmation:
        return "Siparişi Onayla"; 
      case OrderStatus.OrderIsBeingPrepared:
        return "Siparişi kargoya ver";
      case OrderStatus.Delivered:
       return null;
      case OrderStatus.HasBeenShipped:
        return "Siparişi Tamamla"
      default:
        return null;
    }
 }
 async changeOrderStatus(item:ListOrder){
  this.spinner.show(SpinnerType.BallSpinFade);
  await this.orderService.changeOrderStatus(item.id,item.orderStatus);
  this.orderData = [await this.getOrderDetails()];
  this.spinner.hide(SpinnerType.BallSpinFade)
 }
}

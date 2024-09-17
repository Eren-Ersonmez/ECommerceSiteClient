import { Component, OnInit } from '@angular/core';
import { ListOrder } from '../../../../../contracts/models/order/list-order';
import { OrderService } from '../../../../../services/common/models/order.service';
import { BaseDialog } from '../../../../../dialogs/base/base-dialog';
import { OrderDetailsDialogComponent } from '../../../../../dialogs/order-details-dialog/order-details-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  orders:ListOrder[]=[]
  filteredOrders:ListOrder[]=[]
  constructor(private orderService:OrderService,private baseDialog:BaseDialog){}

async ngOnInit(){
    this.orders=(await this.orderService.getUserOrder()).data
    this.filteredOrders=this.orders;
  }
 showOrderDetails(id:string){
  this.baseDialog.setSelectedId({id:id,role:false})
    this.baseDialog.openDialog(OrderDetailsDialogComponent,()=>{})
 }
 filterOrders(status: string) {
  if (status === 'all') {
    this.filteredOrders = this.orders;
   }else if(status=="shipped"){
    this.filteredOrders = this.orders.filter(order => order.orderStatus === 'Sipariş kargoya verildi');
   } else if (status === 'waiting') {
    this.filteredOrders = this.orders.filter(order => order.orderStatus == 'Sipariş Onay Bekliyor');
  }else if (status === 'being') {
    this.filteredOrders = this.orders.filter(order => order.orderStatus == 'Sipariş Hazırlanıyor');
  }
}
}

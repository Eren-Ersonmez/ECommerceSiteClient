import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../../services/admin/alertify.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BaseDialog } from '../../../dialogs/base/base-dialog';
import { OrderService } from '../../../services/common/models/order.service';
import { ListOrder } from '../../../contracts/models/order/list-order';
import { UserService } from '../../../services/common/models/user.service';
import { SelectProductImagesDialogComponent } from '../../../dialogs/select-product-images-dialog/select-product-images-dialog.component';
import { OrderDetailsDialogComponent } from '../../../dialogs/order-details-dialog/order-details-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent extends BaseComponent implements OnInit{
 
  displayedColumns: string[] = ['createdDate', 'orderTotal', 'orderStatus','details','delete','edit'];
  dataSource : MatTableDataSource<ListOrder>=null
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(spinner: NgxSpinnerService, private orderService: OrderService,private userService:UserService, private alertifyService: AlertifyService,private baseDialog:BaseDialog) {
    super(spinner)
  }
  async ngOnInit() {
    await this.getOrders()
  }
  async getOrders() {
    this.showSpinner(SpinnerType.BallSpinRotate)
    const values = await this.orderService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => {
      this.hideSpinner(SpinnerType.BallSpinRotate)
    }, (errorMessage) => {
      this.hideSpinner(SpinnerType.BallSpinRotate)
      this.alertifyService.message("Hata Oluştu", {
        dismissOthers: true,
        messageType: AlertifyMessageType.Error,
        messagePosition: AlertifyMessagePosition.TopRight
      })
    })
      this.dataSource = new MatTableDataSource<ListOrder>(values.data)
      this.paginator.length=values.dataTotalCount
  }
  async pageChanged() {
    await this.getOrders()
  }
  AddOrderDetails(id:string){
    this.baseDialog.setSelectedId({id:id,role:true})
    this.baseDialog.openDialog(OrderDetailsDialogComponent,()=>{
      this.getOrders();
    })
  }
}

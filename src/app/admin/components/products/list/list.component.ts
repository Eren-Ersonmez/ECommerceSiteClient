import { AfterViewInit, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListProduct } from '../../../../contracts/models/products/list-product';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../../../services/admin/alertify.service';
import { BaseDialog } from '../../../../dialogs/base/base-dialog';
import { SelectProductImagesDialogComponent } from '../../../../dialogs/select-product-images-dialog/select-product-images-dialog.component';
import { QrCodeDialogComponent } from '../../../../dialogs/qr-code-dialog/qr-code-dialog.component';
import { ProductFeaturesDialogComponent } from '../../../../dialogs/product-features-dialog/product-features-dialog.component';
declare var $:any
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'stock', 'isHome','photos','qrcode','features','delete','edit'];
  dataSource : MatTableDataSource<ListProduct>=null
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertifyService: AlertifyService,private baseDialog:BaseDialog) {
    super(spinner)
  }
  async ngOnInit() {
    await this.getProducts()
  }
  async getProducts() {
    this.showSpinner(SpinnerType.BallSpinRotate)
    const values = await this.productService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => {
      this.hideSpinner(SpinnerType.BallSpinRotate)
    }, (errorMessage) => {
      this.hideSpinner(SpinnerType.BallSpinRotate)
      this.alertifyService.message("Hata Oluştu", {
        dismissOthers: true,
        messageType: AlertifyMessageType.Error,
        messagePosition: AlertifyMessagePosition.TopRight
      })
    })
      this.dataSource = new MatTableDataSource<ListProduct>(values.data)
      this.paginator.length=values.dataTotalCount
  }
  async pageChanged() {
    await this.getProducts()
  }
  AddProductImages(id:string){
    this.baseDialog.setSelectedId(id)
    this.baseDialog.openDialog(SelectProductImagesDialogComponent,()=>{})
  }
  getProductQrCode(id:string){
    this.baseDialog.setSelectedId(id)
    this.baseDialog.openDialog(QrCodeDialogComponent,()=>{})
  }
  addProductFeatures(id:string){
    this.baseDialog.setSelectedId(id)
    this.baseDialog.openDialog(ProductFeaturesDialogComponent,()=>{})
  }

}


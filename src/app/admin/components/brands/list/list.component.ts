import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Brand } from '../../../../contracts/models/brands/brand';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { BrandService } from '../../../../services/common/models/brand.service';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../../../services/admin/alertify.service';
import { BaseDialog } from '../../../../dialogs/base/base-dialog';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { EditCategoryDialogComponent } from '../../../../dialogs/edit-category-dialog/edit-category-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent{
  displayedColumns: string[] = ['name','categoryName','delete','edit'];
  dataSource : MatTableDataSource<Brand>=null
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    spinner: NgxSpinnerService, 
    private brandService: BrandService, 
    private alertifyService: AlertifyService,
    private baseDialog:BaseDialog) {
    super(spinner)
  }
async ngOnInit(){
    this.getBrands();
  }
  async getBrands() {
    this.showSpinner(SpinnerType.BallSpinRotate)
    const values = await this.brandService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => {
      this.hideSpinner(SpinnerType.BallSpinRotate)
    }, (errorMessage) => {
      this.hideSpinner(SpinnerType.BallSpinRotate)
      this.alertifyService.message("Hata Oluştu", {
        dismissOthers: true,
        messageType: AlertifyMessageType.Error,
        messagePosition: AlertifyMessagePosition.TopRight
      })
    })
      this.dataSource = new MatTableDataSource<Brand>(values.data)
      this.paginator.length=values.dataTotalCount
  }
  async pageChanged() {
    await this.getBrands()
  }
async editBrand(id:string,name:string){
    this.baseDialog.setSelectedId({id:id,name:name})
    this.baseDialog.openDialog(EditCategoryDialogComponent,async()=>{await this.getBrands()})
    
  }
}

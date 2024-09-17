import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ListCategory } from '../../../../contracts/models/categories/list-category';
import { MatPaginator } from '@angular/material/paginator';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from '../../../../services/common/models/category.service';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../../../services/admin/alertify.service';
import { BaseDialog } from '../../../../dialogs/base/base-dialog';
import { EditCategoryDialogComponent } from '../../../../dialogs/edit-category-dialog/edit-category-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit{
  displayedColumns: string[] = ['name','delete','edit'];
  dataSource : MatTableDataSource<ListCategory>=null
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(spinner: NgxSpinnerService, private categoryService: CategoryService, private alertifyService: AlertifyService,private baseDialog:BaseDialog) {
    super(spinner)
  }
async ngOnInit(){
    this.getCategories();
  }
  async getCategories() {
    this.showSpinner(SpinnerType.BallSpinRotate)
    const values = await this.categoryService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => {
      this.hideSpinner(SpinnerType.BallSpinRotate)
    }, (errorMessage) => {
      this.hideSpinner(SpinnerType.BallSpinRotate)
      this.alertifyService.message("Hata Oluştu", {
        dismissOthers: true,
        messageType: AlertifyMessageType.Error,
        messagePosition: AlertifyMessagePosition.TopRight
      })
    })
      this.dataSource = new MatTableDataSource<ListCategory>(values.data)
      this.paginator.length=values.dataTotalCount
  }
  async pageChanged() {
    await this.getCategories()
  }
async editCategory(id:string,name:string){
    this.baseDialog.setSelectedId({id:id,name:name})
    this.baseDialog.openDialog(EditCategoryDialogComponent,async()=>{await this.getCategories()})
    
  }
}

import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../../../services/admin/alertify.service';
import { BaseDialog } from '../../../../dialogs/base/base-dialog';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { ListRole } from '../../../../contracts/models/roles/list-role';
import { RoleService } from '../../../../services/common/models/role.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent {

  displayedColumns: string[] = ['name','delete','edit'];
  dataSource : MatTableDataSource<ListRole>=null
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(spinner: NgxSpinnerService, private roleService: RoleService, private alertifyService: AlertifyService,private baseDialog:BaseDialog) {
    super(spinner)
  }
  async ngOnInit() {
    await this.getRoles()
  }
  async getRoles() {
    this.showSpinner(SpinnerType.BallSpinRotate)
    const values = await this.roleService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => {
      this.hideSpinner(SpinnerType.BallSpinRotate)
    }, (errorMessage) => {
      this.hideSpinner(SpinnerType.BallSpinRotate)
      this.alertifyService.message("Hata Oluştu", {
        dismissOthers: true,
        messageType: AlertifyMessageType.Error,
        messagePosition: AlertifyMessagePosition.TopRight
      })
    })
      this.dataSource = new MatTableDataSource<ListRole>(values.data)
      this.paginator.length=values.dataTotalCount
  }
  async pageChanged() {
    await this.getRoles()
  }
}

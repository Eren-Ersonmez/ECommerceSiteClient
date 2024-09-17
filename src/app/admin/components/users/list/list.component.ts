import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListRole } from '../../../../contracts/models/roles/list-role';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../../../services/admin/alertify.service';
import { BaseDialog } from '../../../../dialogs/base/base-dialog';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { ListApplicationUser } from '../../../../contracts/models/applicationUser/list-application-user';
import { UserService } from '../../../../services/common/models/user.service';
import { AuthorizeUserDialogComponent } from '../../../../dialogs/authorize-user-dialog/authorize-user-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent {

  displayedColumns: string[] = ['name','surname','userName','email','role','delete','edit'];
  dataSource : MatTableDataSource<ListApplicationUser>=null
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(spinner: NgxSpinnerService, private userService: UserService, private alertifyService: AlertifyService,private baseDialog:BaseDialog) {
    super(spinner)
  }
  async ngOnInit() {
    await this.getUsers()
  }
  async getUsers() {
    this.showSpinner(SpinnerType.BallSpinRotate)
    const values = await this.userService.read(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => {
      this.hideSpinner(SpinnerType.BallSpinRotate)
    }, (errorMessage) => {
      this.hideSpinner(SpinnerType.BallSpinRotate)
      this.alertifyService.message("Hata Oluştu", {
        dismissOthers: true,
        messageType: AlertifyMessageType.Error,
        messagePosition: AlertifyMessagePosition.TopRight
      })
    })
      this.dataSource = new MatTableDataSource<ListApplicationUser>(values.data)
      this.paginator.length=values.dataTotalCount
  }
  async pageChanged() {
    await this.getUsers()
  }
  assignARole(id:string){
    this.baseDialog.setSelectedId(id)
    this.baseDialog.openDialog(AuthorizeUserDialogComponent,()=>{
    })
  }
}

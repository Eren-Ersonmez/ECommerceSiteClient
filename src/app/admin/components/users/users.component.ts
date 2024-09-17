import { Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent extends BaseComponent {
  constructor(spinner:NgxSpinnerService,private httpClientService:HttpClientService) {
    super(spinner);
    this.showSpinner(SpinnerType.LineSpinClockwiseFadeRotating)
  }
  @ViewChild(ListComponent) listCompenet
  createdRole(role:any){
     this.listCompenet.getRoles()
  }
}

import { Component, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { HttpClientService } from '../../../services/common/http-client.service';
import { ListComponent } from './list/list.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent extends BaseComponent {
  constructor(spinner:NgxSpinnerService,private httpClientService:HttpClientService) {
    super(spinner);
    this.showSpinner(SpinnerType.Fire)
  }
  @ViewChild(ListComponent) listCompenet
  createdRole(role:any){
     this.listCompenet.getRoles()
  }
}

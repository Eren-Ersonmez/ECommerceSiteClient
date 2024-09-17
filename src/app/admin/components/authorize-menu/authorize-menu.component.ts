import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApplicationService } from '../../../services/common/models/application.service';
import { Menu } from '../../../contracts/models/menu';
import { BaseDialog } from '../../../dialogs/base/base-dialog';
import { AuthorizeMenuDialogComponent } from '../../../dialogs/authorize-menu-dialog/authorize-menu-dialog.component';

@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrl: './authorize-menu.component.scss'
})
export class AuthorizeMenuComponent extends BaseComponent implements OnInit{
  menus: Menu[] = [];
  constructor(spinner:NgxSpinnerService,private applicationService:ApplicationService,private baseDialog:BaseDialog){
    super(spinner);
  }
async  ngOnInit() {
    this.menus = await this.applicationService.GetAuthorizeDefinitionEndpoints();
  }
  assignARole(code:string,menu:string){
    this.baseDialog.setSelectedId({code,menu})
    this.baseDialog.openDialog(AuthorizeMenuDialogComponent,()=>{
    })
  }
}

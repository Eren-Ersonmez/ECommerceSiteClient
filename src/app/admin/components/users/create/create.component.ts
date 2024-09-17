import { Component, EventEmitter, Output } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { ListRole } from '../../../../contracts/models/roles/list-role';
import { RoleService } from '../../../../services/common/models/role.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../../../services/admin/alertify.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent {
  @Output() createdRole: EventEmitter<ListRole> = new EventEmitter();

  constructor(private roleService: RoleService,spinner:NgxSpinnerService,private alertify:AlertifyService) {
    super(spinner)
   }

async create(txtName:string){
   this.showSpinner(SpinnerType.BallSpinFade)
   this.roleService.createRole(txtName,()=>{
    this.alertify.message("Rol başarılı bir şekilde oluşturuldu",{
      messagePosition:AlertifyMessagePosition.TopRight,
      messageType:AlertifyMessageType.Success
    })
    this.createdRole.emit()
   })    

       
   }
}

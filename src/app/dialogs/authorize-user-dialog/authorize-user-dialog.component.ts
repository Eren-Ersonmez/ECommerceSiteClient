import { Component, OnInit } from '@angular/core';
import { ListRole } from '../../contracts/models/roles/list-role';
import { MatListOption } from '@angular/material/list';
import { RoleService } from '../../services/common/models/role.service';
import { BaseDialog } from '../base/base-dialog';
import { UserService } from '../../services/common/models/user.service';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../services/admin/alertify.service';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrl: './authorize-user-dialog.component.scss'
})
export class AuthorizeUserDialogComponent implements OnInit {
  id:string
  typeOfroles:ListRole[]=null;
  selectedRoles:string[]=null;

  constructor(private roleService:RoleService,private baseDialog:BaseDialog,private userService:UserService,private alertify:AlertifyService) {}

  async  ngOnInit() {
    this.baseDialog.selectedId$.subscribe(id=>{
      this.id=id
      })
      this.typeOfroles=(await this.roleService.getRoles()).data;
      this.selectedRoles=(await this.userService.getUsersRoles(this.id)).data
  
    }

  async assignRoles(selected:MatListOption[]){
    debugger
    const roles:string[]=selected.map(o => o._elementRef.nativeElement.innerText)
    await this.userService.assignRoles(this.id,roles,()=>{
     this.alertify.message("Roller Başarılı bir şekilde atandı",{
      messagePosition:AlertifyMessagePosition.TopRight,
      messageType:AlertifyMessageType.Success
     })
    })
    
   }
  selected(roleName: string): boolean {
    for (let v of this.selectedRoles) {
      if (v === roleName) {
        return true;
      }
    }
    return false;
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ListRole } from '../../contracts/models/roles/list-role';
import { RoleService } from '../../services/common/models/role.service';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { AuthorizationService } from '../../services/common/models/authorization.service';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrl: './authorize-menu-dialog.component.scss'
})
export class AuthorizeMenuDialogComponent implements OnInit {
 id:{code:string,menu:string}
  typeOfroles:ListRole[]=null;
  selectedRoles:string[]=null;
  constructor(private roleService:RoleService,private authorizationService:AuthorizationService,private baseDialog:BaseDialog){}

async  ngOnInit() {
  this.baseDialog.selectedId$.subscribe(id=>{
    this.id=id
    })
    this.typeOfroles=(await this.roleService.getRoles()).data;
    this.selectedRoles=(await this.authorizationService.selectedRoles(this.id.code)).data

  }
async assignRoles(selected:MatListOption[]){
   const roles:string[]=selected.map(o => o._elementRef.nativeElement.innerText)
   if(this.selectedRoles.length>0){
    await this.authorizationService.assignRoles(roles,this.id.code);
   }else{
    await this.authorizationService.assignRoles(roles,this.id.code,this.id.menu,()=>{});
   }
   
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
import { Component } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from './services/ui/custom-toastr.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  showDropdown: boolean = false;
 constructor(public authService:AuthService,private toastr:CustomToastrService,private router:Router) {
 }
 toggleDropdown(show: boolean): void {
  this.showDropdown = show;
}

 signOut(){
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  const value:boolean= this.authService.identityCheck();
  this.toastr.message("Oturum kapatıldı","Oturum",{
    toastrMessagePosition:ToastrMessagePosition.TopRight,
    toastrMessageType:ToastrMessageType.Info
  })
  this.router.navigate([""])
  this.toggleDropdown(false);
 }
}

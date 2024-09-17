import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper:JwtHelperService) { }

  identityCheck():boolean{
    const token:string=localStorage.getItem("accessToken")
    let exprired:boolean;
    try{
      exprired=this.jwtHelper.isTokenExpired(token)
    }
    catch{
      exprired=true;
    }
    debugger
   return _isAutherticated=!exprired
  }
  
  get isAutherticated():boolean{
    return _isAutherticated
  }
  signOut(){
    localStorage.removeItem("accessToken");
    this.identityCheck();
  }
}
export let _isAutherticated:boolean=true;

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../services/ui/custom-toastr.service';
import { _isAutherticated } from '../../services/common/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router:Router=inject(Router);
  const toastr:CustomToastrService=inject(CustomToastrService)

  if(!_isAutherticated){
    router.navigate(["login"],{'queryParams':{'returnUrl':state.url}})
    toastr.message("Oturum Açmanız Gerekiyor","Yetkisiz Erişim",{
      toastrMessagePosition:ToastrMessagePosition.TopRight,
      toastrMessageType:ToastrMessageType.Warning
    })
  }
  return true;
};

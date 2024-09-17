import { Component, EventEmitter, Output } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../../../services/admin/alertify.service';
import { BaseDialog } from '../../../../dialogs/base/base-dialog';
import { CategoryService } from '../../../../services/common/models/category.service';
import { CreateCategory } from '../../../../contracts/models/categories/create-category';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent {
  @Output() createdCategory: EventEmitter<CreateCategory> = new EventEmitter();
  constructor(
    spinner:NgxSpinnerService,
    private alertify:AlertifyService,
    private baseDialog:BaseDialog,
    private categoryService:CategoryService) {
    super(spinner)
   }
async  create(name:string){
  this.showSpinner(SpinnerType.BallSpinFade)
  let category:CreateCategory=new CreateCategory();
  category.name=name;
  await this.categoryService.create(category,()=>{
    this.hideSpinner(SpinnerType.BallSpinFade)
    this.alertify.message("Kategori başarıyla eklenmiştir",{
      messageType:AlertifyMessageType.Success,
      messagePosition:AlertifyMessagePosition.TopRight
    })
    this.createdCategory.emit(category)
  },()=>{
    this.alertify.message("Beklenmeyen bir hata oluştu",{
      messageType:AlertifyMessageType.Error,
      messagePosition:AlertifyMessagePosition.TopRight
    })
  })
  }
}

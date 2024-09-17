import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
import { ProductImageFileService } from '../../services/common/models/product-image-file.service';
import { ListProductFileImages } from '../../contracts/files/list-product-file-images';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../services/admin/alertify.service';
declare var $:any

@Component({
  selector: 'app-select-product-images-dialog',
  templateUrl: './select-product-images-dialog.component.html',
  styleUrls: ['./select-product-images-dialog.component.scss']
})
export class SelectProductImagesDialogComponent implements OnInit {
  id: string;
  fileUploadOptions: Partial<FileUploadOptions>;
  
 
  constructor(
    private baseDialog:BaseDialog,
    private fileService:ProductImageFileService,
    private spinner:NgxSpinnerService,
    private alertify:AlertifyService,
   ) {}

  images:ListProductFileImages[]
  async ngOnInit() {
    this.spinner.show(SpinnerType.BallSpinFade)
    this.baseDialog.selectedId$.subscribe(id=>{
    this.id=id
    })
    this.images= (await this.fileService.readImages(this.id,()=>{this.spinner.hide(SpinnerType.BallSpinFade)})).data
    this.fileUploadOptions = {
      controller: "productImageFiles",
      isAdminPage: true,
      queryString: `productId=${this.id}`,
      accept: ".png,.jpeg,.jpg",
      explanation: "Resimleri seçin veya sürükleyin...",
    };
  }
  deleteImage(id:string,event:any){
    this.spinner.show(SpinnerType.Timer)
     this.fileService.deleteImage(id,()=>{
      const card = $(event.target).closest('.product-image-card');
       card.fadeOut(2000,()=>{
        card.remove();
        this.spinner.hide(SpinnerType.Timer)
        this.alertify.message("Resim başarılı bir şekilde silindi",{
          delay:2,
          dismissOthers:true,
          messagePosition:AlertifyMessagePosition.TopRight,
          messageType:AlertifyMessageType.Success
        })
       })
     })
  }
}

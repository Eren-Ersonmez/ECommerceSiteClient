import { Component, OnInit } from '@angular/core';
import { ProductFeatureService } from '../../services/common/models/product-feature.service';
import { CreateProductAttribute } from '../../contracts/models/productAttributes/create-productAttribute';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../services/admin/alertify.service';
import { BaseDialog } from '../base/base-dialog';
import { ProductAttribute } from '../../contracts/models/productAttributes/productAttribute';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-features-dialog',
  templateUrl: './product-features-dialog.component.html',
  styleUrl: './product-features-dialog.component.scss'
})
export class ProductFeaturesDialogComponent implements OnInit {
  id:string;
  productAttributes:ProductAttribute[]
  constructor(
    private productFeatureService:ProductFeatureService,
    private alertify:AlertifyService,
    private baseDialog:BaseDialog
  ){}

async ngOnInit(){
    this.baseDialog.selectedId$.subscribe(id=>{
      this.id=id
    })
    this.productAttributes=(await this.productFeatureService.getProductAttributes(this.id)).data
  }

async addFeature(name:string,value:string){
     let feature:CreateProductAttribute=new CreateProductAttribute();
     feature.attributeName=name;
     feature.attributeValue=value; 
     feature.productId=this.id;
     await this.productFeatureService.addProductAttribute(feature,()=>{
      this.alertify.message("Özellik başarılı bir şekilde eklendi",{
        messageType:AlertifyMessageType.Success,
        messagePosition:AlertifyMessagePosition.TopRight
      })
     })
  }
}

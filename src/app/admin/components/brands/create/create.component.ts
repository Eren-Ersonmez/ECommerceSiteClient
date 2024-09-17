import { Component, EventEmitter, Output } from '@angular/core';
import { CreateBrand } from '../../../../contracts/models/brands/create-Brand';
import { Brand } from '../../../../contracts/models/brands/brand';
import { BrandService } from '../../../../services/common/models/brand.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../../../services/admin/alertify.service';
import { BaseDialog } from '../../../../dialogs/base/base-dialog';
import { CategoryService } from '../../../../services/common/models/category.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { ListCategory } from '../../../../contracts/models/categories/list-category';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent {
  @Output() createdBrand: EventEmitter<CreateBrand> = new EventEmitter();
  categories:ListCategory[]=[];
  selectedCategoryId:string="";
  constructor(private brandService: BrandService,
    spinner:NgxSpinnerService,
    private alertify:AlertifyService,
    private baseDialog:BaseDialog,
    private categoryService:CategoryService) {
    super(spinner)
   }
async ngOnInit(){
  const categoryResult=await this.categoryService.read(0,0,()=>{})
  const categories=await this.categoryService.read(0,categoryResult.dataTotalCount,()=>{})
  this.categories=categories.data
  }
  async  create(name:string){
    this.showSpinner(SpinnerType.BallSpinFade)
    let brand:CreateBrand=new CreateBrand();
    brand.name=name;
    brand.categoryId=this.selectedCategoryId;
    await this.brandService.addBrand(brand,()=>{
      this.hideSpinner(SpinnerType.BallSpinFade)
      this.alertify.message("Marka başarıyla eklenmiştir",{
        messageType:AlertifyMessageType.Success,
        messagePosition:AlertifyMessagePosition.TopRight
      })
      this.createdBrand.emit(brand)
    },()=>{
      this.alertify.message("Beklenmeyen bir hata oluştu",{
        messageType:AlertifyMessageType.Error,
        messagePosition:AlertifyMessagePosition.TopRight
      })
    })
    }
}

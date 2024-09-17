import { Component, Output ,EventEmitter, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../../../services/admin/alertify.service';
import { CreateProduct } from '../../../../contracts/models/products/create-product';
import { BaseDialog } from '../../../../dialogs/base/base-dialog';
import { QrCodeReadingDialogComponent } from '../../../../dialogs/qr-code-reading-dialog/qr-code-reading-dialog.component';
import { CategoryService } from '../../../../services/common/models/category.service';
import { ListCategory } from '../../../../contracts/models/categories/list-category';
import { Brand } from '../../../../contracts/models/brands/brand';
import { BrandService } from '../../../../services/common/models/brand.service';
import { ProductFeaturesDialogComponent } from '../../../../dialogs/product-features-dialog/product-features-dialog.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent extends BaseComponent implements OnInit {

  @Output() createdProduct: EventEmitter<CreateProduct> = new EventEmitter();
  categories:ListCategory[]=[];
  brands:Brand[]=[]
 selectedCategoryId:string="";

  selectedBrandId:string="";
  constructor(private productService: ProductService,
    spinner:NgxSpinnerService,
    private alertify:AlertifyService,
    private baseDialog:BaseDialog,
    private categoryService:CategoryService,
    private brandService:BrandService) {
    super(spinner)
   }
async ngOnInit(){
  const categoryResult=await this.categoryService.read(0,0,()=>{})
  const categories=await this.categoryService.read(0,categoryResult.dataTotalCount,()=>{})
  this.categories=categories.data
  }

  create(txtName: HTMLInputElement, txtStock: HTMLInputElement, txtPrice: HTMLInputElement, txtArea: HTMLTextAreaElement)
  {
      this.showSpinner(SpinnerType.BallSpinFade)
      const product:CreateProduct=new CreateProduct()
      product.name=txtName.value
      product.description=txtArea.value
      product.stock=parseFloat(txtStock.value)
      product.price=parseInt(txtPrice.value)
      product.isHome=true
      product.categoryId=this.selectedCategoryId
      product.brandId=this.selectedBrandId
      this.productService.create(product,()=>{
        this.hideSpinner(SpinnerType.BallSpinFade)
        this.alertify.message("Ürün başarıyla eklenmiştir",{
          messageType:AlertifyMessageType.Success,
          messagePosition:AlertifyMessagePosition.TopRight
        })
        this.createdProduct.emit(product)
      },(errorMessage)=>{
        this.alertify.message(errorMessage,{
          messageType:AlertifyMessageType.Error,
          messagePosition:AlertifyMessagePosition.TopRight
        })
      })
  }
  async getBrands(){
    const brands=await this.brandService.getCategoryBrands(this.selectedCategoryId)
    this.brands=brands.data
  }
  QrCodeWithUpdate(id:string){
    this.baseDialog.setSelectedId(id)
    this.baseDialog.openDialog(QrCodeReadingDialogComponent,()=>{})
  }
  addProductFeatures(){
    this.baseDialog.openDialog(ProductFeaturesDialogComponent,()=>{})
  }
}

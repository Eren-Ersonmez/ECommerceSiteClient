import { Component, EventEmitter, OnInit, Output, Type } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { ListProduct } from '../../../../contracts/models/products/list-product';
import { ListCategory } from '../../../../contracts/models/categories/list-category';
import { CategoryService } from '../../../../services/common/models/category.service';
import { ProductImageFileService } from '../../../../services/common/models/product-image-file.service';
import { CustomResponse } from '../../../../contracts/common/custom-response';
import { ListProductFileImages } from '../../../../contracts/files/list-product-file-images';
import { ShoppingCartService } from '../../../../services/common/models/shopping-cart.service';
import { CreateShoppingCart } from '../../../../contracts/models/shoppingCart/create-shoppingCart';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../../services/ui/custom-toastr.service';
import { UserService } from '../../../../services/common/models/user.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../../services/common/shared.service';
import { Brand } from '../../../../contracts/models/brands/brand';
import { BrandService } from '../../../../services/common/models/brand.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  public productData:ListProduct[];
  public productTotalCount:number;
  public productPageCount:number;
  public pageSize:number=12;
  public categoryData:ListCategory[];
  public brandsData:Brand[];
  public firstImagePath:string;
  public currentImage:string;
  selectedCategoryId:string="";
  priceRange = { min: 0, max: 150000 };

  constructor(
    private productService:ProductService,
    private categoryService:CategoryService,
    private productImageFileService:ProductImageFileService,
    private shoppingCartService:ShoppingCartService,
    private toastr:CustomToastrService,
    private userService:UserService,
    private router:Router,
    private sharedService:SharedService,
    private brandService:BrandService
  ) {
    
    
  }
 async ngOnInit() {
   const categoryResult=await this.categoryService.read(0,0,()=>{})
   const categories=await this.categoryService.read(0,categoryResult.dataTotalCount,()=>{})
   this.categoryData=categories.data
   const productResult=await this.getProducts(0);
   this.productData=productResult.data
   this.productTotalCount=productResult.dataTotalCount
   this.productPageCount=Math.ceil(this.productTotalCount/this.pageSize)

  }
 async getProducts(page:number):Promise<CustomResponse<ListProduct[]>>{
  this.selectedCategoryId="";
  const productResult= await this.productService.read(page,this.pageSize,()=>{});
  this.productData=productResult.data
  this.productData.forEach(async (v,i)=>{
    const imageResult=await this.productImageFileService.readImages(v.id,()=>{})
    if(imageResult.data && imageResult.data.length > 0){
      v.img=imageResult.data
    }
    else{
     v.img=[]
     const imgNull:ListProductFileImages=new ListProductFileImages();
     imgNull.filePath="assets/no-camera.png"
     v.img.push(imgNull)
    }
    
  })
  return productResult
  }
  startImageSlideshow(item:any){
    item.imageIndex = 0;
    this.firstImagePath=item.img[0].filePath
    item.slideshowInterval = setInterval(() => {
        item.img[0].filePath=this.firstImagePath
        item.imageIndex = (item.imageIndex+1) % item.img.length;
        item.img[0].filePath= item.img[item.imageIndex].filePath;
    }, 1000); 

  }
  stopImageSlideshow(item){
 clearInterval(item.slideshowInterval);
  item.img[0].filePath=this.firstImagePath;
  }
 async addShoppingCart(item:ListProduct){
  if(localStorage.getItem("accessToken")){
    const shoppingCart:CreateShoppingCart=new CreateShoppingCart();
    shoppingCart.price=item.price;
    shoppingCart.count=1,
    shoppingCart.productId=item.id,
    await this.shoppingCartService.addShoppingCart(shoppingCart,()=>{
      this.toastr.message("Ürün Sepete Eklendi","Sepet",{
        toastrMessageType:ToastrMessageType.Success,
        toastrMessagePosition:ToastrMessagePosition.TopRight
      })
    })
  }else{
    this.toastr.message("Giriş yapmadan sepete ürün ekleyemezsiniz","Uyarı",{
      toastrMessageType:ToastrMessageType.Warning,
      toastrMessagePosition:ToastrMessagePosition.TopRight
    })
  }
  }
  getProduct(id:string){
    this.sharedService.changeId(id);
    this.router.navigate(["/products/product"])
  }
async categoryProducts(id:string){
  if(id!=""){
    this.selectedCategoryId=id;
  }
   this.productData= (await this.productService.getCategoryProducts(id)).data
   this.productData.forEach(async (v,i)=>{
    const imageResult=await this.productImageFileService.readImages(v.id,()=>{})
    if(imageResult.data && imageResult.data.length > 0){
      v.img=imageResult.data
    }
    else{
     v.img=[]
     const imgNull:ListProductFileImages=new ListProductFileImages();
     imgNull.filePath="assets/no-camera.png"
     v.img.push(imgNull)
    }
    
  })
  this.brandsData=(await this.brandService.getCategoryBrands(id)).data

  }
async brandProducts(brandId:string){
  this.productData=(await this.productService.getBrandProducts(brandId)).data
  this.productData.forEach(async (v,i)=>{
    const imageResult=await this.productImageFileService.readImages(v.id,()=>{})
    if(imageResult.data && imageResult.data.length > 0){
      v.img=imageResult.data
    }
    else{
     v.img=[]
     const imgNull:ListProductFileImages=new ListProductFileImages();
     imgNull.filePath="assets/no-camera.png"
     v.img.push(imgNull)
    }
    
  })
}
}

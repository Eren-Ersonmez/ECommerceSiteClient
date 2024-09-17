import { Component } from '@angular/core';
import { ListProduct } from '../../../../../contracts/models/products/list-product';
import { ProductService } from '../../../../../services/common/models/product.service';
import { ProductImageFileService } from '../../../../../services/common/models/product-image-file.service';
import { ShoppingCartService } from '../../../../../services/common/models/shopping-cart.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../../../services/ui/custom-toastr.service';
import { UserService } from '../../../../../services/common/models/user.service';
import { SharedService } from '../../../../../services/common/shared.service';
import { CustomResponse } from '../../../../../contracts/common/custom-response';
import { ListProductFileImages } from '../../../../../contracts/files/list-product-file-images';
import { CreateShoppingCart } from '../../../../../contracts/models/shoppingCart/create-shoppingCart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  public productData:ListProduct[];
  public firstImagePath:string;
  public currentImage:string;
  priceRange = { min: 0, max: 150000 };

  constructor(
    private productService:ProductService,
    private productImageFileService:ProductImageFileService,
    private shoppingCartService:ShoppingCartService,
    private toastr:CustomToastrService,
    private userService:UserService,
    private router:Router,
    private sharedService:SharedService,
  ) {
    
    
  }
 async ngOnInit() {
   await this.getProducts();

  }
 async getProducts(){
  const productResult= await this.userService.getFavoriteProducts();
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
}

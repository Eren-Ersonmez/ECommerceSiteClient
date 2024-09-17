import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { ListProduct } from '../../../../contracts/models/products/list-product';
import { SharedService } from '../../../../services/common/shared.service';
import { ProductImageFileService } from '../../../../services/common/models/product-image-file.service';
import { ListProductFileImages } from '../../../../contracts/files/list-product-file-images';
import { CommentService } from '../../../../services/common/models/comment.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../../services/ui/custom-toastr.service';
import { Comment } from '../../../../contracts/models/comment/comment';
import { CreateShoppingCart } from '../../../../contracts/models/shoppingCart/create-shoppingCart';
import { ShoppingCartService } from '../../../../services/common/models/shopping-cart.service';
import { ProductAttribute } from '../../../../contracts/models/productAttributes/productAttribute';
import { ProductFeatureService } from '../../../../services/common/models/product-feature.service';
import { UserService } from '../../../../services/common/models/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
 id:string
 product:ListProduct[]=[];
 images:ListProductFileImages[]=[];
 comment = ''; 
 rightToLike:boolean=true;
 productComments:Comment[]=[];
 productAttributes:ProductAttribute[];
 firstImage:ListProductFileImages=null;
  constructor(
    private toastr:CustomToastrService,
    private productService:ProductService,
    private imageService:ProductImageFileService,
    private sharedService:SharedService,
    private commentService:CommentService,
    private shoppingCartService:ShoppingCartService,
    private productfeaturesService:ProductFeatureService,
    private userService:UserService
  ){
    this.sharedService.currentId.subscribe(id => {
      this.id = id;
    });
  }
async ngOnInit(){
    this.product[0]=(await this.productService.getProduct(this.id)).data
    this.images=(await this.imageService.readImages(this.id,()=>{})).data
    this.firstImage=this.images[0];
    this.productAttributes=await (await this.productfeaturesService.getProductAttributes(this.id)).data
    this.getProductComment();
  }
  changeFirstImage(img:ListProductFileImages){
   this.firstImage=img;
  }
  async getProductComment(){
    this.productComments=(await this.commentService.getProductComment(this.id)).data;
  }
async  onSubmit(){
    await this.commentService.addComment(this.id,this.comment,()=>{
       this.toastr.message("Yorum başarıyla yapıldı","Başarılı",{
        toastrMessagePosition:ToastrMessagePosition.TopRight,
        toastrMessageType:ToastrMessageType.Success
       })
       this.comment='';
       this.getProductComment();
    })
  }
async liked(id:string){
  if(this.rightToLike){
    await this.commentService.commentLiked(id,()=>{this.getProductComment()})
    this.rightToLike=false;
  }
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
  previousImage(){
    const currentIndex=this.images.indexOf(this.firstImage);
    const previousIndex = (currentIndex - 1 + this.images.length) % this.images.length; 
    this.firstImage = this.images[previousIndex];
  }
  nextImage(){
    const currentIndex=this.images.indexOf(this.firstImage);
    const previousIndex = (currentIndex - 1 + this.images.length) % this.images.length; 
    this.firstImage = this.images[previousIndex];
  }
  async addFavoriteProduct(){
    await this.userService.addFavoriteProduct(this.id,()=>{
      this.toastr.message("Ürün Favarilere Eklendi","Başarılı",{
        toastrMessagePosition:ToastrMessagePosition.TopRight,
        toastrMessageType:ToastrMessageType.Success
      })
    })
  }
}

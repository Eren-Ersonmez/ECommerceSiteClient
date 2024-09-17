import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShoppingCartService } from '../../../services/common/models/shopping-cart.service';
import { ListShoppingCart } from '../../../contracts/models/shoppingCart/list-shoppingCart';
import { ProductImageFileService } from '../../../services/common/models/product-image-file.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent extends BaseComponent implements OnInit {

  public carts:ListShoppingCart[]=null
  constructor(spinner:NgxSpinnerService,
    private shoppingCartService:ShoppingCartService,
    private productImageService:ProductImageFileService
  ) {
    super(spinner);
    this.showSpinner(SpinnerType.LineSpinClockwiseFadeRotating)
  }
async ngOnInit() {
   this.carts=await this.getShoppingCarts();
  
    this.carts.forEach(async(v,i)=>{
       v.product.img=(await this.productImageService.readImages(v.product.id,()=>{})).data
    })
  }
  getTotalPrice(): number {
    return this.carts.reduce((total, item) => {
      return total + (item.price * item.count);
    }, 0);
  }
 async getShoppingCarts(){
    return (await this.shoppingCartService.getShoppingCart()).data
  }
async updateCartCountPlus(item:ListShoppingCart){
  this.showSpinner(SpinnerType.Cog)
    item.count+=1
    let cart=new ListShoppingCart();
    await this.shoppingCartService.updateShoppingCart(item)
    this.hideSpinner(SpinnerType.Cog)
  }
async updateCartCountMinus(item:ListShoppingCart,td:any){
  this.showSpinner(SpinnerType.Cog)
   if(item.count-1>0){
    item.count-=1
    await this.shoppingCartService.updateShoppingCart(item)
   }else if(item.count-1==0){
    await this.shoppingCartService.deleteShoppingCart(item.id)
    this.showSpinner(SpinnerType.BallSpinFade)
    $(td.parentElement).fadeOut(2000,()=>{
      this.hideSpinner(SpinnerType.BallSpinFade)
    })
    
   }
   this.hideSpinner(SpinnerType.Cog)
  }

}

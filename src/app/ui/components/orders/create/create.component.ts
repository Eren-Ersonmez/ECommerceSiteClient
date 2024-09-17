import { Component, OnInit } from '@angular/core';
import { ListShoppingCart } from '../../../../contracts/models/shoppingCart/list-shoppingCart';
import { ShoppingCartService } from '../../../../services/common/models/shopping-cart.service';
import { AddressService } from '../../../../services/common/models/address.service';
import { CreditCardService } from '../../../../services/common/models/credit-card.service';
import { CreateAddress } from '../../../../contracts/models/address/create-address';
import { CreateCreditCard } from '../../../../contracts/models/creditCard/create-credit-card';
import { OrderService } from '../../../../services/common/models/order.service';
import { CreateOrder } from '../../../../contracts/models/order/create-order';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../../../services/ui/custom-toastr.service';
import { Router } from '@angular/router';
import { CreateOrderDetails } from '../../../../contracts/models/order/create-order-details';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {

  public carts:ListShoppingCart[]=null
  constructor(
    private shoppingCartService:ShoppingCartService,
    private addressService:AddressService,
    private creditCardService:CreditCardService,
    private orderService:OrderService,
    private toastr:CustomToastrService,
    private router:Router
  ) {}
async ngOnInit() {
    this.carts=await this.getShoppingCarts()
  }

async getShoppingCarts(){
    return (await this.shoppingCartService.getShoppingCart()).data
  }

  getTotalPrice(): number {
    return this.carts.reduce((total, item) => {
      return total + (item.price * item.count);
    }, 0);
  }

async create
  (
    txtName:HTMLInputElement,
    txtSurname:HTMLInputElement,
    txtAddress:HTMLInputElement,
    txtCity:HTMLInputElement,
    txtDistrict:HTMLInputElement,
    txtPhoneNumber:HTMLInputElement,
    txtPostalCode:HTMLInputElement,
    txtCardName:HTMLInputElement,
    txtCardNumber:HTMLInputElement,
    txtExpirationDateMonth:HTMLInputElement,
    txtExpirationDateYear:HTMLInputElement,
    txtCVC:HTMLInputElement,
    txtTitle:HTMLInputElement
  )
  {
    const createCreditCard=new CreateCreditCard();
    createCreditCard.cardName=txtCardName.value;
    createCreditCard.cardNumber=txtCardNumber.value;
    createCreditCard.expirationDateMonth=parseInt(txtExpirationDateMonth.value);
    createCreditCard.expirationDateYear=parseInt(txtExpirationDateYear.value);
    createCreditCard.cvc=txtCVC.value;
    const createAddress=new CreateAddress();
    createAddress.title=txtTitle.value;
    createAddress.content=txtAddress.value;
    createAddress.district=txtDistrict.value;
    createAddress.postalCode=txtPostalCode.value;
    createAddress.city=txtCity.value;
    createAddress.addressOwnerName=txtName.value;
    createAddress.addressOwnerSurname=txtSurname.value;
    createAddress.phoneNumber=txtPhoneNumber.value;
    const address=(await this.addressService.addAddress(createAddress)).data
    const creditCard=(await this.creditCardService.addCreditCard(createCreditCard)).data
    const createOrder=new CreateOrder();
    createOrder.addressId=address.id;
    createOrder.creditCardId=creditCard.id;
    createOrder.orderDetailIds=[]
    createOrder.orderTotal=this.getTotalPrice();
    await this.CreateOrder(createOrder)
  }

async CreateOrder(createOrder:CreateOrder){
  debugger;
    const order=await this.orderService.addOrder(createOrder,()=>{})
    for (const v of this.carts) {
      let orderDetails = new CreateOrderDetails();
      orderDetails.count = v.count;
      orderDetails.price = v.price;
      orderDetails.productId = v.productId;
      orderDetails.orderId=order.data.id;
      const addedOrderDetails = (await this.orderService.addOrderDetails(orderDetails)).data;
      createOrder.orderDetailIds.push(addedOrderDetails.id);
    }
    this.toastr.message("Sipariş başarılı bir şekilde oluşturuldu","Sipariş Alındı",{
      toastrMessagePosition:ToastrMessagePosition.TopRight,
      toastrMessageType:ToastrMessageType.Success
    })
    this.router.navigate(["/orders"])
}
}

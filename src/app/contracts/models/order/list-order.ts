import { User } from "../../../entities/user";
import { ListAddress } from "../address/list-address";
import { ListApplicationUser } from "../applicationUser/list-application-user";
import { ListCreditCard } from "../creditCard/list-credit-card";
import { ListShoppingCart } from "../shoppingCart/list-shoppingCart";
import { OrderDetails } from "./order-details";

export class ListOrder{
    id:string;
    createdDate:Date;
    applicationUser:ListApplicationUser;
    applicationUserId:string
    orderTotal:number;
    orderStatus:string;
    address:ListAddress;
    addressId:string;
    creditCardId:string;
    orderDetails:OrderDetails[];
    orderDetailsId:string[];
}
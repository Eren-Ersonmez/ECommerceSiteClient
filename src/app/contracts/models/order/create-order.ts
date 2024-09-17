import { ListAddress } from "../address/list-address";
import { ListCreditCard } from "../creditCard/list-credit-card";
import { OrderDetails } from "./order-details";


export class CreateOrder {
    orderTotal:number;
    addressId:string;
    creditCardId:string;
    orderDetailIds:string[];
}

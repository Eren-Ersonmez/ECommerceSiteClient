import { ListProduct } from "../products/list-product";

export class OrderDetails{
    public id:string;
    public productId:string;
    public product:ListProduct;
    public count:number;
    public price:number

}
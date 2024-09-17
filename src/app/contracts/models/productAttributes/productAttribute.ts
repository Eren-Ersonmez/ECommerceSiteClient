import { ListProduct } from "../products/list-product";

export class ProductAttribute{
    id:string;
    productId:string;
    product:ListProduct;
    attributeName:string;
    attributeValue:string;
}
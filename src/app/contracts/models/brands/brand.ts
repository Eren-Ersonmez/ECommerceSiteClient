import { ListCategory } from "../categories/list-category";
import { ListProduct } from "../products/list-product";

export class Brand{
    public id:string;
    public name:string;
    public category:ListCategory;
    public products:ListProduct[];

}
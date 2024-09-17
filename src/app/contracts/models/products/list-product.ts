import { ListProductFileImages } from "../../files/list-product-file-images"
import { Comment } from "../comment/comment";

export class ListProduct {
    id:string;
    name:string;
    description:string;
    price:number;
    stock:number;
    isHome:boolean;
    comment:Comment[];
    img:ListProductFileImages[];
}

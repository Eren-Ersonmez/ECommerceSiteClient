import { ListApplicationUser } from "../applicationUser/list-application-user";

export class Comment{
    id:string;
    commentContent:string;
    applicationUser:ListApplicationUser;
    createdDate:string;
    likeCount:number;
}
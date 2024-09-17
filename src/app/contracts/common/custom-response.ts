export class CustomResponse<T> {
    data:T
    statusCode:number
    errors:string[]
    dataTotalCount:number
}

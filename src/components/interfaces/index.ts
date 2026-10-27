
 export interface IProduct {
    
    brand: string,
    createdAt: string,
    description: string,
    documentId: string,
     id: number ,
     price: number ,
    publishedAt: string ,
    stock: number
    quantity:number ,
    title:string  ,
     updatedAt: string,
     
     Image: {
         formats: {
             thumbnail: {
                 url:string
             } 
         }
         url?:string , 
     }
}
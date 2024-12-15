import type { Product } from "@/types/product";
import { products } from "../../public/products";

export const getAllProducts = async (): Promise<Product[]> =>{
  return new Promise ((resolve, reject) =>{
    return setTimeout(()=>{
      resolve(products);
    },3000);
  })
}
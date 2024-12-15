import type { Product } from "./product"

export type Cart = {
  product: Product;
  quantity: number;
}
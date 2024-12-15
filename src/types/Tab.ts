import type { Product } from "./product";

export type Tab={
  title: string;
  value: string;
  products: Product[];
}
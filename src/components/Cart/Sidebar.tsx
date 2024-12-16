"use client"
import { RocketIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Separator } from "../ui/separator"
import { useCartStore } from "@/stores/cart-store"
import { CartItem } from "./CartItem"

export const Sidebar = () =>{

  const {cart} = useCartStore(state => state);

  let subtotal = 0
  for (let item of cart) {
    subtotal += item.quantity * item.product.price
  }

  return(
    <Sheet >
      <SheetTrigger asChild>
        <Button className="relative">
          <RocketIcon className="mr-3"/>
          <p>Carrinho</p>
          {cart.length > 0 &&
            <div className="absolute size-3 bg-red-600 rounded-full -right-1 -top-1"></div>
          }
        </Button>
      </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Carrinho</SheetTitle>
            </SheetHeader>
                  <div className="flex flex-col gap-5 my-3">
                    {cart.map(item =>(
                      <CartItem key={item.product.id} item = {item}/>
                    ))}
                  </div>
                  <Separator className="my-4"/>
                  <div className="flex justify-between items-center text-xs">
                    <div>Subtotal:</div>
                    <div>{`R$ ${subtotal.toFixed(2)}`}</div>
                  </div>
                  <Separator className="my-4"/>
                  <div className="text-center">
                    <Button
                    disabled ={cart.length === 0}
                    >finalizar Comprar</Button>
                  </div>
          </SheetContent>
    </Sheet>
  )
}
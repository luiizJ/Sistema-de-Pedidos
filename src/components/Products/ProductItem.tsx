"use client"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@radix-ui/react-toast"

type Props ={
  item: Product
}

export const ProductItem =({item}:Props) =>{
    const {toast} = useToast();
    const handleAddButton = () =>{
      // adicionar item no storage
      //exibir aviso
      toast({
        title:'Adicionado ao carrinho!',
        description: item.name,
        action:<ToastAction altText="fechar">Fechar</ToastAction>
      })
    }

  return(
    <div>
      <div className="rounded-md overflow-hidden">
        <img 
        src={item.image}
        alt={item.name}
        className="w-full h-32 object-contain"
        />
      </div>
        <div className="mt-3 gap-2 flex flex-col">
            <p className="text-lg">{item.name}</p>
            <p className="text-sm opacity-50">R$ {item.price.toFixed(2)}</p>
            <Button
            variant="outline"
            onClick={handleAddButton}
            >Adicionar</Button>
        </div>
    </div>
  )
}
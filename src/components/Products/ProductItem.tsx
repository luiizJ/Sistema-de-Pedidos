"use client";

import type { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useCartStore } from "@/stores/cart-store";
import { useConfigStore } from "@/stores/config-store";
import { Plus, ShoppingCart } from "lucide-react";

type Props = {
  item: Product;
};

export const ProductItem = ({ item }: Props) => {
  const { toast } = useToast();
  const { upsertCartItem } = useCartStore((state) => state);
  const { isOpen } = useConfigStore();

  const handleAddButton = () => {
    upsertCartItem(item, 1);
    toast({
      title: "Adicionado ao carrinho!",
      description: item.name,
      action: <ToastAction altText="fechar">Fechar</ToastAction>,
    });
  };

  return (
    <div
      className={`flex items-center gap-2 p-2 bg-card/50 backdrop-blur-sm border border-border/40 rounded-[1.8rem] transition-all hover:border-primary/40 hover:bg-card/80 group min-h-[140px] ${
        !isOpen && "opacity-60 grayscale"
      }`}
    >
      {/* Imagem em tamanho equilibrado */}
      <div className="w-28 h-28 flex-shrink-0 rounded-[1.4rem] overflow-hidden bg-secondary/50">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Área de Conteúdo */}
      <div className="flex flex-col justify-between flex-1 min-w-0 h-full py-1">
        <div>
          <h3 className="font-bold text-base md:text-lg leading-tight truncate">
            {item.name}
          </h3>
          <p className="text-muted-foreground text-[10px] md:text-xs line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Preço em destaque  */}
          <span className="text-primary font-bold text-lg">
            R$ {item.price.toFixed(2)}
          </span>

          <Button
            disabled={!isOpen}
            className="h-10 w-10 p-0 rounded-2xl bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-black transition-all active:scale-90"
            variant="outline"
            onClick={handleAddButton}
          >
            {isOpen ? (
              <Plus className="h-5 w-5" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

import { TabsContent, TabsTrigger, Tabs, TabsList } from "@/components/ui/tabs"
import { getAllProducts } from "@/services/GetProducts"
import type { Tab } from "@/types/Tab";
import { ProductEmpty } from "./Empty";
import { ProductItem } from "./ProductItem";

export const ProducsTab = async() =>{
  const products = await getAllProducts();

  const tabs: Tab[] = [
    {
      title:'sushi',
      value:"sushi",
      products: products.filter(item => item.category === "sushi")
    },
    {
      title:'Hamburger',
      value:"Hamburger",
      products: products.filter(item => item.category === "Hamburger")
    },
    {
      title:'Bebidas',
      value:"Bebidas",
      products: products.filter(item => item.category === "bebidas")
    },
    {
      title:'Temaki',
      value:"Temaki",
      products: products.filter(item => item.category === "Temaki")
    },
    {
      title:'Combos',
      value:"Pack",
      products: products.filter(item => item.category === "pack")
    },
  ];

  return(
    <Tabs defaultValue="Hamburger">
      <TabsList className="flex">
        
        {tabs.map(item =>(
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="flex-1">
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
        {tabs.map(item =>(
          <TabsContent 
          className="mt-6"
          key={item.value}
          value={item.value}>
              {item.products.length > 0 &&
                <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                    {item.products.map(itens =>(
                      <ProductItem key={itens.id} item={itens} />
                    ))}
                </div>
              }
               {item.products.length === 0 &&
                <ProductEmpty />
               }

          </TabsContent>
        ))}
    </Tabs>
  )
}
import { TabsContent, TabsTrigger, Tabs, TabsList } from "@/components/ui/tabs";
import { getAllProducts } from "@/services/GetProducts";
import type { Tab } from "@/types/Tab";
import { ProductEmpty } from "./Empty";
import { ProductItem } from "./ProductItem";

export const ProducsTab = async () => {
  const products = await getAllProducts();

  const tabs: Tab[] = [
    {
      title: "Sushi",
      value: "sushi",
      products: products.filter((item) => item.category === "sushi"),
    },
    {
      title: "Hambúrguer",
      value: "Hamburger",
      products: products.filter((item) => item.category === "Hamburger"),
    },
    {
      title: "Bebidas",
      value: "Bebidas",
      products: products.filter((item) => item.category === "bebidas"),
    },
    {
      title: "Temaki",
      value: "Temaki",
      products: products.filter((item) => item.category === "Temaki"),
    },
    {
      title: "Combos",
      value: "Pack",
      products: products.filter((item) => item.category === "pack"),
    },
  ];

  return (
    <Tabs defaultValue="Hamburger" className="w-full">
      <TabsList className="flex w-full overflow-x-auto bg-transparent h-auto p-0 gap-2 scrollbar-hide">
        {tabs.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="flex-1 py-3 px-4 rounded-2xl data-[state=active]:bg-primary data-[state=active]:text-black border border-border/40 transition-all font-bold text-xs uppercase tracking-wider"
          >
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((item) => (
        <TabsContent
          className="mt-8 outline-none"
          key={item.value}
          value={item.value}
        >
          {item.products.length > 0 ? (
            <div className="grid gap-5 grid-cols-1 xl:grid-cols-2 lg:grid-cols-3">
              {item.products.map((product) => (
                <ProductItem key={product.id} item={product} />
              ))}
            </div>
          ) : (
            <ProductEmpty />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};

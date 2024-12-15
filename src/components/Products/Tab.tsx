import { TabsContent, TabsTrigger, Tabs, TabsList } from "@/components/ui/tabs"
import { getAllProducts } from "@/services/GetProducts"

export const ProducsTab = async() =>{
  const products = await getAllProducts();

  return(
    <Tabs defaultValue="tab1">
      <TabsList className="flex">
        <TabsTrigger
         className="flex-1"
         value="tab1">tab1</TabsTrigger>
        <TabsTrigger 
          className="flex-1"
          value="tab2">tab2</TabsTrigger>
      </TabsList>
          <TabsContent
            className="mt-6"
            value="tab1">
              conteudo 1
          </TabsContent>
            <TabsContent 
              className="mt-6"
              value="tab2">
                conteudo 2
            </TabsContent>
    </Tabs>
  )
}
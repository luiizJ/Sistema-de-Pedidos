import type { CheckoutSteps } from "@/types/checkout-steps"
import type { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { useCheckoutStore } from "@/stores/checkout-store"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const formSchema = z.object({
  street: z.string().min(2, "Preencha seu endereço"),
  number: z.string().min(2, "Numero da casa"),
  complement: z.string().optional(),
  state: z.string().min(2, "Estado"),
  city: z.string().min(2, "Cidade"),
  district: z.string().min(2, "Bairro"),

})

type Props ={
  setStep: Dispatch<SetStateAction<CheckoutSteps>>
}

export const StepAddress = ({setStep}: Props)=>{
  
  const {address, setAddress} = useCheckoutStore(state => state);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues: {...address}
  })

  const onSubmit = (value: z.infer<typeof formSchema>) =>{
    setAddress(value);
    setStep("finish");
  }
  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <FormField 
            control = {form.control}
            name="street"
            render={({field}) =>(
              <FormItem>
                <FormLabel>Rua</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control = {form.control}
            name="number"
            render={({field}) =>(
              <FormItem>
                <FormLabel>Numero da casa</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control = {form.control}
            name="complement"
            render={({field}) =>(
              <FormItem>
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control = {form.control}
            name="state"
            render={({field}) =>(
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Select defaultValue={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Estado"/>
                    </SelectTrigger>
                        <SelectContent
                        className="max-h-48 overflow-y-scroll" >
                        <SelectItem value="ac">Acre</SelectItem>
                        <SelectItem value="al">Alagoas</SelectItem>
                        <SelectItem value="ap">Amapá</SelectItem>
                        <SelectItem value="am">Amazonas</SelectItem>
                        <SelectItem value="ba">Bahia</SelectItem>
                        <SelectItem value="ce">Ceará</SelectItem>
                        <SelectItem value="df">Distrito Federal</SelectItem>
                        <SelectItem value="es">Espírito Santo</SelectItem>
                        <SelectItem value="go">Goiás</SelectItem>
                        <SelectItem value="ma">Maranhão</SelectItem>
                        <SelectItem value="mt">Mato Grosso</SelectItem>
                        <SelectItem value="ms">Mato Grosso do Sul</SelectItem>
                        <SelectItem value="mg">Minas Gerais</SelectItem>
                        <SelectItem value="pa">Pará</SelectItem>
                        <SelectItem value="pb">Paraíba</SelectItem>
                        <SelectItem value="pr">Paraná</SelectItem>
                        <SelectItem value="pe">Pernambuco</SelectItem>
                        <SelectItem value="pi">Piauí</SelectItem>
                        <SelectItem value="rj">Rio de Janeiro</SelectItem>
                        <SelectItem value="rn">Rio Grande do Norte</SelectItem>
                        <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                        <SelectItem value="ro">Rondônia</SelectItem>
                        <SelectItem value="rr">Roraima</SelectItem>
                        <SelectItem value="sc">Santa Catarina</SelectItem>
                        <SelectItem value="sp">São Paulo</SelectItem>
                        <SelectItem value="se">Sergipe</SelectItem>
                        <SelectItem value="to">Tocantins</SelectItem>
                        </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField 
            control = {form.control}
            name="city"
            render={({field}) =>(
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control = {form.control}
            name="district"
            render={({field}) =>(
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div className="flex justify-between mt-4">
          <Button variant="link" onClick={()=>setStep('user')}>Voltar</Button>
          <Button type="submit">Concluir</Button>
          </div>
      </form>
    </Form>
  )
}
import type { CheckoutSteps } from "@/types/checkout-steps";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCheckoutStore } from "@/stores/checkout-store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Importamos nosso schema blindado
import { addressSchema, type AddressFormData } from "@/schemas/checkout-schema";

type Props = {
  setStep: Dispatch<SetStateAction<CheckoutSteps>>;
};

export const StepAddress = ({ setStep }: Props) => {
  const { address, setAddress } = useCheckoutStore((state) => state);

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: { ...address },
  });

  const onSubmit = (value: AddressFormData) => {
    setAddress(value);
    setStep("payment");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Rua</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Rua João Pessoa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input placeholder="123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Centro">Centro</SelectItem>
                    <SelectItem value="Intermares">Intermares</SelectItem>
                    <SelectItem value="Bessa">Bessa</SelectItem>
                    <SelectItem value="Camboinha">Camboinha</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Complemento (Opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Próximo à praça" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="link" type="button" onClick={() => setStep("user")}>
            Voltar
          </Button>
          <Button type="submit" className="px-8">
            Próximo
          </Button>
        </div>
      </form>
    </Form>
  );
};

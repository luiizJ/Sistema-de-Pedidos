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

// Importando o schema centralizado
import { userSchema, type UserFormData } from "@/schemas/checkout-schema";

type Props = {
  setStep: Dispatch<SetStateAction<CheckoutSteps>>;
};

export const StepUser = ({ setStep }: Props) => {
  const { name, setName } = useCheckoutStore((state) => state);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: { name },
  });

  const onSubmit = (value: UserFormData) => {
    setName(value.name);
    setStep("address");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seu Nome</FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  placeholder="Digite seu nome completo"
                  {...field}
                  className="focus-visible:ring-primary" // Exemplo de toque personalizado ShadCN
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="default" className="w-full font-bold">
          Próximo
        </Button>
      </form>
    </Form>
  );
};

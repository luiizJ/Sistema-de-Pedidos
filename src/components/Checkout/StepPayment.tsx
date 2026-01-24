"use client";

import type { CheckoutSteps } from "@/types/checkout-steps";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCheckoutStore } from "@/stores/checkout-store";
import { useCartStore } from "@/stores/cart-store";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { paymentSchema, type PaymentData } from "@/schemas/checkout-schema";

type Props = {
  setStep: Dispatch<SetStateAction<CheckoutSteps>>;
};

export const StepPayment = ({ setStep }: Props) => {
  const { payment, setPayment } = useCheckoutStore((state) => state);
  const { cart } = useCartStore((state) => state);

  // Calcula o total real do carrinho
  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const form = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { ...payment },
  });

  // Monitoramento reativo dos campos para blindagem
  const method = form.watch("method");
  const changeValue = parseFloat(form.watch("change") || "0");

  // Regra de Ouro: Bloqueia se o valor for menor que o total
  const isInsufficient = method === "cash" && changeValue < total;

  const onSubmit = (value: PaymentData) => {
    setPayment(value);
    setStep("finish"); // Avança para a conclusão final
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="text-center mb-2 bg-secondary/50 p-4 rounded-lg border border-dashed">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            Total a Pagar
          </p>
          <p className="text-3xl font-black text-primary">
            R$ {total.toFixed(2)}
          </p>
        </div>

        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-bold">
                Como deseja pagar?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col gap-3"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0 border p-4 rounded-md hover:bg-accent transition-colors cursor-pointer">
                    <FormControl>
                      <RadioGroupItem value="pix" />
                    </FormControl>
                    <FormLabel className="font-medium flex-1 cursor-pointer">
                      PIX ( Pix fornecido nos proximos passos )
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0 border p-4 rounded-md hover:bg-accent transition-colors cursor-pointer">
                    <FormControl>
                      <RadioGroupItem value="card" />
                    </FormControl>
                    <FormLabel className="font-medium flex-1 cursor-pointer">
                      Cartão ( No ato da entrega )
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0 border p-4 rounded-md hover:bg-accent transition-colors cursor-pointer">
                    <FormControl>
                      <RadioGroupItem value="cash" />
                    </FormControl>
                    <FormLabel className="font-medium flex-1 cursor-pointer">
                      Dinheiro ( Informar se precisa de troco )
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Lógica de Troco Dinâmico */}
        {method === "cash" && (
          <FormField
            control={form.control}
            name="change"
            render={({ field }) => (
              <FormItem className="animate-in fade-in slide-in-from-top-2 duration-300">
                <FormLabel className="font-bold">Troco para quanto?</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={`Valor mínimo: R$ ${total.toFixed(2)}`}
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                    className={
                      isInsufficient
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                  />
                </FormControl>

                {isInsufficient && changeValue > 0 && (
                  <p className="text-xs text-destructive font-bold animate-pulse">
                    ⚠️ Valor insuficiente! O pedido deu R$ {total.toFixed(2)}
                  </p>
                )}

                {!isInsufficient && changeValue > total && (
                  <p className="text-xs text-green-500 font-medium italic">
                    ✅ O motoboy levará R$ {(changeValue - total).toFixed(2)} de
                    troco.
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-between items-center mt-4">
          <Button
            variant="ghost"
            type="button"
            onClick={() => setStep("address")}
          >
            ← Voltar ao endereço
          </Button>

          <Button
            type="submit"
            size="lg"
            disabled={isInsufficient}
            className="px-10 font-bold"
          >
            {isInsufficient ? "Valor Insuficiente" : "Finalizar Pedido"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

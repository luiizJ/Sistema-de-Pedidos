import { z } from "zod";

// Schema focado em capturar o nome do cliente de forma válida
export const userSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres") // Aumentado para mais segurança
    .max(50, "Nome muito longo"),
});

// Tipagem inferida para usar no formulário
export type UserFormData = z.infer<typeof userSchema>;

// Schema focado em capturar o endereço de entrega de forma válida
export const addressSchema = z.object({
  street: z
    .string()
    .min(5, "A rua deve ter pelo menos 5 caracteres")
    .refine((val) => val.toLowerCase() !== "snt", {
      message: "Por favor, informe o nome real da rua",
    }),
  number: z.string().min(1, "O número é obrigatório"),
  complement: z.string().optional(),
  // Substituímos o input livre por um seletor de bairros fixos de Cabedelo
  district: z.string().min(2, "Selecione o bairro"),
});

export type AddressFormData = z.infer<typeof addressSchema>;

// Schema focado em capturar o método de pagamento de forma válida
export const paymentSchema = z
  .object({
    method: z.enum(["pix", "card", "cash"]),
    change: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.method === "cash") {
        const changeValue = parseFloat(data.change || "0");
        // Regra: Se for dinheiro, o campo troco não pode ser vazio ou zero
        return changeValue > 0;
      }
      return true;
    },
    {
      message: "Informe o valor para o troco",
      path: ["change"],
    }
  );

export type PaymentData = z.infer<typeof paymentSchema>;

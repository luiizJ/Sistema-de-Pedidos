import { create } from "zustand";
import { AddressFormData, type PaymentData } from "@/schemas/checkout-schema"; // Importando a tipagem do Zod

type States = {
  name: string;
  address: AddressFormData; // Agora o Store segue exatamente o Schema de validação
  payment: PaymentData; // Agora o Store segue exatamente o Schema de validação
};

type Actions = {
  setName: (name: string) => void;
  setAddress: (address: AddressFormData) => void;
  setPayment: (payment: PaymentData) => void;
};

const initialState: States = {
  name: "",
  address: {
    street: "",
    number: "",
    complement: "",
    district: "", // Bairro no lugar de cidade/estado
  },
  payment: { method: "pix", change: "" },
};

export const useCheckoutStore = create<States & Actions>()((set) => ({
  ...initialState,
  setName: (name) => set((state) => ({ ...state, name })),
  setAddress: (address) => set((state) => ({ ...state, address })),
  setPayment: (payment) => set((state) => ({ ...state, payment })),
}));

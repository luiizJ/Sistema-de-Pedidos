import { create } from "zustand";
import { persist } from "zustand/middleware";

type ConfigState = {
  isOpen: boolean;
  zapNumber: string;
  pixKey: string;
  // Ações para alterar o estado
  setIsOpen: (status: boolean) => void;
  setZapNumber: (num: string) => void;
  setPixKey: (key: string) => void;
};

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      // Valores iniciais (pegando do .env como padrão inicial)
      isOpen: true,
      zapNumber: process.env.NEXT_PUBLIC_ZAP || "",
      pixKey: process.env.NEXT_PUBLIC_PIX_KEY || "",

      setIsOpen: (isOpen) => set({ isOpen }),
      setZapNumber: (zapNumber) => set({ zapNumber }),
      setPixKey: (pixKey) => set({ pixKey }),
    }),
    {
      name: "fastfood-config-storage",
    }
  )
);

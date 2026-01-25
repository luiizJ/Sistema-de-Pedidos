import { create } from "zustand";

/**
 * Interface que define o estado global de configurações da loja.
 * Agora integrado com o NeonDB para garantir que todos os usuários
 * vejam o mesmo status em tempo real.
 */
type ConfigState = {
  isOpen: boolean;
  zapNumber: string;
  pixKey: string;

  // Ação centralizada para atualizar o estado com os dados vindos do servidor
  updateConfig: (data: {
    isOpen: boolean;
    zapNumber: string;
    pixKey: string;
  }) => void;

  // Mantemos as ações individuais caso precise de manipulação local antes de salvar
  setIsOpen: (status: boolean) => void;
  setZapNumber: (num: string) => void;
  setPixKey: (key: string) => void;
};

export const useConfigStore = create<ConfigState>((set) => ({
  // Valores iniciais: começam vazios ou padrão.
  // Eles serão preenchidos pelo banco de dados assim que o app carregar.
  isOpen: false,
  zapNumber: "",
  pixKey: "",

  // Função mestre: Hidrata todo o store de uma vez só
  updateConfig: (data) =>
    set({
      isOpen: data.isOpen,
      zapNumber: data.zapNumber,
      pixKey: data.pixKey,
    }),

  // Ações individuais para flexibilidade na UI
  setIsOpen: (isOpen) => set({ isOpen }),
  setZapNumber: (zapNumber) => set({ zapNumber }),
  setPixKey: (pixKey) => set({ pixKey }),
}));

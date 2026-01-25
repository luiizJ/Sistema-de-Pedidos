"use client";

import { useCheckoutStore } from "@/stores/checkout-store";
import { useConfigStore } from "@/stores/config-store";
import { Button } from "../ui/button";
import { generateMessage } from "@/lib/generate-message";

export const StepFinish = () => {
  const { name, payment } = useCheckoutStore((state) => state);

  // Pegamos os dados que o lojista salvou no Painel Admin via Zustand
  const { zapNumber, pixKey, isOpen } = useConfigStore();

  const msg = generateMessage();

  // Validação: O número precisa existir e ser válido
  const isZapConfigured =
    zapNumber && zapNumber.trim() !== "" && zapNumber.length > 5;

  const linkWPP = isZapConfigured
    ? `https://wa.me/${zapNumber}?text=${encodeURIComponent(msg)}`
    : "#";

  return (
    <div className="text-center flex flex-col gap-5 py-4 animate-in fade-in zoom-in duration-300">
      <p className="text-lg">
        Perfeito, <strong>{name}</strong>!
      </p>

      {/* BLOQUEIO: LOJA FECHADA */}
      {!isOpen && (
        <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20 text-destructive text-sm font-bold uppercase tracking-wider">
          🔴 ESTAMOS FECHADOS AGORA!
          <p className="font-normal text-[10px] mt-1 text-muted-foreground">
            Agradecemos a preferência, mas não estamos aceitando pedidos no
            momento.
          </p>
        </div>
      )}

      {/* DADOS DE PAGAMENTO (Só mostra se estiver aberta) */}
      {isOpen && payment.method === "pix" && (
        <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
          <p className="text-[10px] font-bold mb-2 text-primary uppercase">
            Chave PIX para pagamento:
          </p>
          <code className="block bg-background p-2 rounded text-[10px] border select-all font-mono break-all">
            {pixKey || "Chave não configurada"}
          </code>
        </div>
      )}

      {/* BOTÃO DE FINALIZAÇÃO */}
      {!isOpen ? (
        <Button
          size="lg"
          variant="secondary"
          className="w-full font-bold opacity-50 cursor-not-allowed"
          disabled
        >
          🚫 PEDIDOS ENCERRADOS
        </Button>
      ) : !isZapConfigured ? (
        <Button
          size="lg"
          variant="destructive"
          className="w-full font-bold opacity-70 cursor-not-allowed"
          disabled
        >
          ❌ CONFIGURAÇÃO PENDENTE
        </Button>
      ) : (
        <Button
          asChild
          size="lg"
          className="w-full font-bold shadow-lg transition-transform active:scale-95"
        >
          <a target="_blank" href={linkWPP} rel="noopener noreferrer">
            🚀 ENVIAR PEDIDO NO WHATSAPP
          </a>
        </Button>
      )}

      {!isZapConfigured && isOpen && (
        <p className="text-[10px] text-destructive italic">
          Erro: WhatsApp não configurado no Painel Admin.
        </p>
      )}
    </div>
  );
};

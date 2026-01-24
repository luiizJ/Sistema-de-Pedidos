"use client";

import { useCheckoutStore } from "@/stores/checkout-store";
import { Button } from "../ui/button";
import { generateMessage } from "@/lib/generate-message";

export const StepFinish = () => {
  const { name, payment } = useCheckoutStore((state) => state);

  const msg = generateMessage();

  const zapNumber = process.env.NEXT_PUBLIC_ZAP;
  const pixKey = process.env.NEXT_PUBLIC_PIX_KEY;

  const linkWPP = zapNumber
    ? `https://wa.me/${zapNumber}?text=${encodeURIComponent(msg)}`
    : "#";

  return (
    <div className="text-center flex flex-col gap-5 py-4 animate-in fade-in zoom-in duration-300">
      <p className="text-lg">
        Perfeito, <strong>{name}</strong>!
      </p>

      {payment.method === "pix" && (
        <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
          <p className="text-sm font-bold mb-2 text-primary">
            Chave PIX para pagamento:
          </p>
          <code className="block bg-background p-2 rounded text-xs border select-all font-mono break-all">
            {pixKey || "Chave PIX não configurada"}
          </code>
          <p className="text-[10px] mt-2 italic text-muted-foreground">
            Copie a chave acima e envie o comprovante após clicar no botão
            abaixo.
          </p>
        </div>
      )}

      {payment.method === "card" && (
        <div className="p-4 bg-secondary/50 rounded-lg border border-dashed text-sm">
          💳 Pagamento via <strong>Cartão</strong> na entrega.
        </div>
      )}

      {payment.method === "cash" && (
        <div className="p-4 bg-secondary/50 rounded-lg border border-dashed text-sm">
          💵 Pagamento em <strong>Dinheiro</strong> na entrega.
        </div>
      )}

      <p className="text-muted-foreground text-sm">
        Clique no botão abaixo para enviar o pedido para o nosso WhatsApp.
      </p>

      {/* Correção do Botão: Se não houver zapNumber, ele renderiza um botão desativado */}
      {!zapNumber ? (
        <Button
          size="lg"
          className="w-full font-bold opacity-50 cursor-not-allowed"
          disabled
        >
          🚀 CONFIGURAÇÃO PENDENTE
        </Button>
      ) : (
        <Button
          asChild
          size="lg"
          className="w-full font-bold shadow-lg transition-transform active:scale-95"
        >
          <a target="_blank" href={linkWPP} rel="noopener noreferrer">
            🚀 FINALIZAR E ENVIAR PEDIDO
          </a>
        </Button>
      )}

      {!zapNumber && (
        <p className="text-[10px] text-destructive font-bold uppercase">
          Erro: Verifique o número de WhatsApp no arquivo
        </p>
      )}
    </div>
  );
};

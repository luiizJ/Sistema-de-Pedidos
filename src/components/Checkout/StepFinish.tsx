"use client";

import { useCheckoutStore } from "@/stores/checkout-store";
import { Button } from "../ui/button";
import { generateMessage } from "@/lib/generate-message";

export const StepFinish = () => {
  const { name, payment } = useCheckoutStore((state) => state);

  const msg = generateMessage();

  // Acesso seguro às variáveis de ambiente
  const zapNumber = process.env.NEXT_PUBLIC_ZAP;
  const pixKey = process.env.NEXT_PUBLIC_PIX_KEY;

  // Previne o erro de "undefined" na URL caso a ENV não esteja carregada
  const linkWPP = zapNumber
    ? `https://wa.me/${zapNumber}?text=${encodeURIComponent(msg)}`
    : "#";

  return (
    <div className="text-center flex flex-col gap-5 py-4 animate-in fade-in zoom-in duration-300">
      <p className="text-lg">
        Perfeito, <strong>{name}</strong>!
      </p>

      {/* Condicional para PIX */}
      {payment.method === "pix" && (
        <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
          <p className="text-sm font-bold mb-2 text-primary">
            Chave PIX para pagamento:
          </p>
          <code className="block bg-background p-2 rounded text-xs border select-all font-mono break-all">
            {pixKey || "Chave PIX não configurada no .env"}
          </code>
          <p className="text-[10px] mt-2 italic text-muted-foreground">
            Copie a chave acima e envie o comprovante após clicar no botão
            abaixo.
          </p>
        </div>
      )}

      {/* Condicional para Cartão */}
      {payment.method === "card" && (
        <div className="p-4 bg-secondary/50 rounded-lg border border-dashed">
          <p className="text-sm">
            💳 O pagamento será realizado via <strong>Cartão</strong>{" "}
            diretamente com o entregador.
          </p>
        </div>
      )}

      {/* Condicional para Dinheiro */}
      {payment.method === "cash" && (
        <div className="p-4 bg-secondary/50 rounded-lg border border-dashed">
          <p className="text-sm">
            💵 O pagamento será realizado em <strong>Dinheiro</strong> no ato da
            entrega.
          </p>
        </div>
      )}

      <p className="text-muted-foreground text-sm">
        Clique no botão abaixo para enviar o pedido para o nosso WhatsApp.
      </p>

      <Button
        asChild
        size="lg"
        className="w-full font-bold shadow-lg transition-transform active:scale-95"
        disabled={!zapNumber}
      >
        <a target="_blank" href={linkWPP} rel="noopener noreferrer">
          🚀 FINALIZAR E ENVIAR PEDIDO
        </a>
      </Button>

      {!zapNumber && (
        <p className="text-[10px] text-destructive font-bold">ERRO:</p>
      )}
    </div>
  );
};

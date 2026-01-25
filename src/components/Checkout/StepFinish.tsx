"use client";

import { useCheckoutStore } from "@/stores/checkout-store";
import { useConfigStore } from "@/stores/config-store";
import { Button } from "../ui/button";
import { generateMessage } from "@/lib/generate-message";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, CreditCard, Banknote } from "lucide-react";
import { useState } from "react";

export const StepFinish = () => {
  const { name, payment } = useCheckoutStore((state) => state);
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Dados sincronizados com o NeonDB
  const { zapNumber, pixKey, isOpen } = useConfigStore();

  const msg = generateMessage();

  const isZapConfigured =
    zapNumber && zapNumber.trim() !== "" && zapNumber.length > 5;

  const linkWPP = isZapConfigured
    ? `https://wa.me/${zapNumber}?text=${encodeURIComponent(msg)}`
    : "#";

  const handleCopyPix = () => {
    if (!pixKey) return;
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    toast({
      title: "Chave PIX Copiada!",
      description: "Cole no seu banco para finalizar o pagamento.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

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
            Infelizmente não estamos recebendo pedidos no momento.
          </p>
        </div>
      )}

      {/* ÁREA DE PAGAMENTO DINÂMICA */}
      {isOpen && (
        <div className="bg-muted/50 p-4 rounded-lg border border-border">
          {payment.method === "pix" ? (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-primary uppercase">
                Chave PIX para pagamento:
              </p>
              <div
                onClick={handleCopyPix}
                className="group relative cursor-pointer active:scale-95 transition-all"
              >
                <code className="block bg-background p-3 rounded text-[11px] border border-primary/20 font-mono break-all pr-10">
                  {pixKey || "Chave não configurada"}
                </code>
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-primary/40" />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-2">
              {payment.method === "card" ? (
                <CreditCard className="w-8 h-8 text-primary opacity-80" />
              ) : (
                <Banknote className="w-8 h-8 text-primary opacity-80" />
              )}
              <p className="text-sm font-medium">
                Pagamento no {payment.method === "card" ? "Cartão" : "Dinheiro"}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">
                Pague ao receber seu pedido
              </p>
            </div>
          )}
        </div>
      )}

      {/* BOTÕES DE FINALIZAÇÃO */}
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
          ❌ WHATSAPP NÃO CONFIGURADO
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
          O dono da loja precisa configurar o número no painel.
        </p>
      )}
    </div>
  );
};

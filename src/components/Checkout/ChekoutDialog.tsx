"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Progress } from "../ui/progress";
import { StepUser } from "./StepUser";
import { StepAddress } from "./StepAddress";
import { StepPayment } from "./StepPayment"; // Importando a nova etapa
import { StepFinish } from "./StepFinish";
import type { CheckoutSteps } from "@/types/checkout-steps";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ChekoutDialog = ({ open, onOpenChange }: Props) => {
  const [step, setStep] = useState<CheckoutSteps>("user");
  let progressPct = 0;

  // Atualizei a lógica de progresso para 4 etapas (25% cada)
  switch (step) {
    case "user":
      progressPct = 25;
      break;
    case "address":
      progressPct = 50;
      break;
    case "payment":
      progressPct = 75;
      break;
    case "finish":
      progressPct = 100;
      break;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === "user" && "Dados Pessoais"}
            {step === "address" && "Endereço de entrega"}
            {step === "payment" && "Forma de Pagamento"}
            {step === "finish" && "Envie para o nosso WhatsApp"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          {step === "user" && <StepUser setStep={setStep} />}
          {step === "address" && <StepAddress setStep={setStep} />}
          {step === "payment" && <StepPayment setStep={setStep} />}
          {step === "finish" && <StepFinish />}
        </div>

        <Progress value={progressPct} className="h-2" />
      </DialogContent>
    </Dialog>
  );
};

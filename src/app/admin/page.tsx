"use client";

import { useState } from "react";
import { useConfigStore } from "@/stores/config-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { isOpen, zapNumber, pixKey, setIsOpen, setZapNumber, setPixKey } =
    useConfigStore();

  // Puxa direto do ambiente. Se não existir, trava por segurança.
  const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ADMIN_PASS) {
      alert("Erro crítico: Senha não configurada no servidor.");
      return;
    }

    if (password === ADMIN_PASS) {
      setIsAuthenticated(true);
    } else {
      alert("Senha incorreta! Tente novamente.");
    }
  };

  // TELA DE LOGIN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm border-primary/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Acesso Restrito
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pass">Senha do Painel</Label>
                <Input
                  id="pass"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha mestra"
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full font-bold">
                ENTRAR NO PAINEL
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // PAINEL ADMINISTRATIVO (Só aparece se estiver autenticado)
  return (
    <div className="min-h-screen bg-background p-8 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
      <Card className="w-full max-w-md shadow-2xl border-primary/20">
        <CardHeader className="text-center border-b mb-6">
          <CardTitle className="text-2xl font-bold tracking-tight">
            ⚙️ Painel do Lojista
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Gerencie o status e dados da sua loja
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-dashed">
            <div className="space-y-0.5">
              <Label className="text-base">Status da Loja</Label>
              <p className="text-sm text-muted-foreground">
                {isOpen ? "🟢 Aberta para pedidos" : "🔴 Fechada no momento"}
              </p>
            </div>
            <Switch
              checked={isOpen}
              onCheckedChange={setIsOpen}
              className="data-[state=checked]:bg-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zap">WhatsApp do Estabelecimento</Label>
            <Input
              id="zap"
              value={zapNumber}
              onChange={(e) => setZapNumber(e.target.value)}
              placeholder="Ex: 5583994189808"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pix">Chave PIX para Recebimento</Label>
            <Input
              id="pix"
              value={pixKey}
              onChange={(e) => setPixKey(e.target.value)}
              placeholder="E-mail ou CPF"
            />
          </div>

          <p className="text-[10px] text-center text-muted-foreground italic">
            Configurações salvas automaticamente no seu navegador.
          </p>
        </CardContent>
      </Card>
      <a
        href="/"
        className="mt-8 text-sm text-primary hover:underline transition-all"
      >
        ← Voltar para a vitrine
      </a>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useConfigStore } from "@/stores/config-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react"; // Se tiver o lucide-react instalado

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { isOpen, zapNumber, pixKey, setIsOpen, setZapNumber, setPixKey } =
    useConfigStore();

  const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      setIsAuthenticated(true);
    } else {
      alert("Senha incorreta!");
    }
  };

  // FUNÇÃO DE LOGOUT
  const handleLogout = () => {
    setIsAuthenticated(false); // Mata o acesso na hora
    setPassword(""); // Limpa o campo de senha
  };

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
                  placeholder="Digite a senha"
                />
              </div>
              <Button type="submit" className="w-full font-bold">
                ENTRAR
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
      {/* Botão de Sair no Topo */}
      <div className="w-full max-w-md flex justify-end mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair do Painel
        </Button>
      </div>

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
          {/* ... (Seus campos de Switch, Zap e Pix aqui) ... */}
          <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-dashed">
            <div className="space-y-0.5">
              <Label className="text-base">Status da Loja</Label>
            </div>
            <Switch
              checked={isOpen}
              onCheckedChange={setIsOpen}
              className="data-[state=checked]:bg-green-500"
            />
          </div>

          <div className="space-y-2">
            <Label>WhatsApp</Label>
            <Input
              value={zapNumber}
              onChange={(e) => setZapNumber(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Chave PIX</Label>
            <Input value={pixKey} onChange={(e) => setPixKey(e.target.value)} />
          </div>

          <p className="text-[10px] text-center text-muted-foreground italic">
            Configurações salvas automaticamente. Clique em "Sair" para bloquear
            o acesso.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

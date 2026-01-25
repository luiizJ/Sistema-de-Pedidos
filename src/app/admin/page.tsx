"use client";

import { useState } from "react";
import { useConfigStore } from "@/stores/config-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LogOut, Save, CheckCircle2, Store, StoreIcon } from "lucide-react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSavedAlert, setShowSavedAlert] = useState(false);

  const config = useConfigStore();

  // Estados Locais para edição consciente
  const [tempIsOpen, setTempIsOpen] = useState(
    config.isOpen ? "open" : "closed"
  );
  const [tempZap, setTempZap] = useState(config.zapNumber);
  const [tempPix, setTempPix] = useState(config.pixKey);

  const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASS) {
      setIsAuthenticated(true);
    } else {
      alert("Senha incorreta!");
    }
  };

  const handleSave = () => {
    config.setIsOpen(tempIsOpen === "open");
    config.setZapNumber(tempZap);
    config.setPixKey(tempPix);

    setShowSavedAlert(true);
    setTimeout(() => setShowSavedAlert(false), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm border-primary/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center">Acesso Restrito</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha Mestra"
              />
              <Button type="submit" className="w-full font-bold">
                ACESSAR PAINEL
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8 flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="w-full max-w-md flex justify-end mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAuthenticated(false)}
          className="text-destructive"
        >
          <LogOut className="w-4 h-4 mr-2" /> Encerrar Sessão
        </Button>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-primary/20">
        <CardHeader className="text-center border-b mb-6">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <Store className="w-6 h-6" /> Configurações
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Select de Status em vez de Switch */}
          <div className="space-y-2">
            <Label htmlFor="status">Status do Estabelecimento</Label>
            <Select value={tempIsOpen} onValueChange={setTempIsOpen}>
              <SelectTrigger
                className={
                  tempIsOpen === "open"
                    ? "border-green-500 text-green-600"
                    : "border-red-500 text-red-600"
                }
              >
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">🟢 ABERTO</SelectItem>
                <SelectItem value="closed">🔴 FECHADO</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>WhatsApp de Destino</Label>
            <Input
              value={tempZap}
              onChange={(e) => setTempZap(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Chave PIX</Label>
            <Input
              value={tempPix}
              onChange={(e) => setTempPix(e.target.value)}
              placeholder="E-mail, CPF ou Telefone"
            />
          </div>

          <Button
            onClick={handleSave}
            className="w-full font-bold gap-2 bg-primary hover:bg-primary/90"
          >
            {showSavedAlert ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {showSavedAlert ? "ALTERAÇÕES SALVAS!" : "SALVAR E APLICAR"}
          </Button>

          {showSavedAlert && (
            <p className="text-[10px] text-center text-green-600 font-bold animate-pulse">
              As configurações foram aplicadas e já estão no ar!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

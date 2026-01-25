"use client";

import { useState } from "react";
import { updateStoreSettings } from "../actions/settings";
import { checkAdminPassword } from "../actions/actions";
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
import { LogOut, Save, CheckCircle2, Store, Lock } from "lucide-react";

export default function AdminPage({ initialData }: { initialData: any }) {
  // Estados de Autenticação
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // Estados de UI
  const [showSavedAlert, setShowSavedAlert] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Estados Locais carregando dados do Banco (NeonDB)
  const [tempIsOpen, setTempIsOpen] = useState(
    initialData?.isOpen ? "open" : "closed"
  );
  const [tempZap, setTempZap] = useState(initialData?.contactNumber || "");
  const [tempPix, setTempPix] = useState(initialData?.pixKey || "");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    const isValid = await checkAdminPassword(password);
    if (isValid) {
      setIsAuthenticated(true);
    } else {
      alert("Senha incorreta!");
      setPassword("");
    }
    setIsPending(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleSave = async () => {
    setIsSaving(true);

    // BLINDAGEM: Enviamos a senha atual para a Action validar no servidor
    const result = await updateStoreSettings(
      {
        isOpen: tempIsOpen === "open",
        pixKey: tempPix,
        contactNumber: tempZap,
      },
      password
    ); // <--- A senha é passada aqui como segundo argumento

    if (result.success) {
      setShowSavedAlert(true);
      setTimeout(() => setShowSavedAlert(false), 3000);
    } else {
      // Caso a senha expire ou seja inválida na Action, mostramos o erro real
      alert(result.message || "Erro ao salvar no banco de dados!");
    }

    setIsSaving(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm border-primary/20 shadow-2xl">
          <CardHeader className="flex flex-col items-center gap-2">
            <Lock className="w-8 h-8 text-primary" />
            <CardTitle className="text-center">Painel Protegido</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha de Acesso"
                disabled={isPending}
                autoFocus
              />
              <Button
                type="submit"
                className="w-full font-bold"
                disabled={isPending}
              >
                {isPending ? "VERIFICANDO..." : "ACESSAR PAINEL"}
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
          onClick={handleLogout}
          className="text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4 mr-2" /> Encerrar Sessão
        </Button>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-primary/20">
        <CardHeader className="text-center border-b mb-6">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <Store className="w-6 h-6" /> Configurações da Loja
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="status">Status do Estabelecimento</Label>
            <Select value={tempIsOpen} onValueChange={setTempIsOpen}>
              <SelectTrigger
                className={
                  tempIsOpen === "open"
                    ? "border-green-500 text-green-600 font-bold"
                    : "border-red-500 text-red-600 font-bold"
                }
              >
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">
                  🟢 ABERTO (Recebendo Pedidos)
                </SelectItem>
                <SelectItem value="closed">
                  🔴 FECHADO (Pedidos Bloqueados)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>WhatsApp de Destino (Com DDD)</Label>
            <Input
              value={tempZap}
              onChange={(e) => setTempZap(e.target.value)}
              placeholder="Ex: 5583999999999"
            />
          </div>

          <div className="space-y-2">
            <Label>Chave PIX para Recebimento</Label>
            <Input
              value={tempPix}
              onChange={(e) => setTempPix(e.target.value)}
              placeholder="E-mail, CPF ou Telefone"
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full font-bold gap-2 bg-primary hover:bg-primary/90 transition-all active:scale-95"
          >
            {isSaving ? (
              "SALVANDO NO NEON..."
            ) : showSavedAlert ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {!isSaving &&
              (showSavedAlert ? "ALTERAÇÕES APLICADAS!" : "SALVAR E PUBLICAR")}
          </Button>

          {showSavedAlert && (
            <p className="text-[10px] text-center text-green-600 font-bold animate-pulse uppercase">
              O banco de dados foi atualizado com sucesso!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

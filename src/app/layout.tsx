import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

// Importações do Banco de Dados
import { db } from "@/db";
import { storeConfig } from "@/db/schema";
import { eq } from "drizzle-orm";
import StoreInitializer from "@/components/StoreInitializer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Sistema-De-Pedidos",
  description: "Criado Por Luiz",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 1. Busca os dados reais no NeonDB
  const [config] = await db
    .select()
    .from(storeConfig)
    .where(eq(storeConfig.id, 1))
    .limit(1);

  // 2. Prepara os dados para o Zustand
  const storeData = {
    isOpen: config?.isOpen ?? false,
    zapNumber: config?.contactNumber ?? "",
    pixKey: config?.pixKey ?? "",
  };

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={fontSans.variable}>
        {/* 3. Injeta os dados no Zustand logo no carregamento */}
        <StoreInitializer data={storeData} />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

// src/db/seed.ts
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { storeConfig } from "./schema";

// Carrega o .env.local para ter a URL do banco
config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function main() {
  console.log("🌱 Semeando banco de dados...");

  try {
    await db
      .insert(storeConfig)
      .values({
        id: 1,
        isOpen: false,
        pixKey: "sua-chave-aqui",
        contactNumber: "5511999999999",
      })
      .onConflictDoNothing(); // Prevenção de erro se já existir

    console.log("✅ Configuração inicial criada com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao semear banco:", error);
    process.exit(1);
  }

  process.exit(0);
}

main();

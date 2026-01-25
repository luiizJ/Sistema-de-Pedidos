// src/app/admin/page.tsx
import { db } from "@/db";
import { storeConfig } from "@/db/schema";
import { eq } from "drizzle-orm";
import AdminClientPage from "./adminPage"; // Vamos renomear seu componente atual

export default async function AdminPage() {
  // Busca os dados direto do NeonDB no lado do servidor
  const config = await db
    .select()
    .from(storeConfig)
    .where(eq(storeConfig.id, 1))
    .limit(1);

  const initialData = config[0];

  // Passamos os dados do banco para o seu componente de cliente
  return <AdminClientPage initialData={initialData} />;
}

"use server";
import { db } from "@/db";
import { storeConfig } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateStoreSettings(
  formData: {
    isOpen: boolean;
    pixKey: string;
    contactNumber: string;
  },
  adminPassword: string // <--- ADICIONE ESTA LINHA AQUI
) {
  try {
    // BLINDAGEM: Validação de segurança no servidor
    const isAuthorized = adminPassword === process.env.ADMIN_PASSWORD;

    if (!isAuthorized) {
      return { success: false, message: "Acesso negado! Senha inválida." };
    }

    // Atualiza o registro ID 1
    await db
      .update(storeConfig)
      .set({
        isOpen: formData.isOpen,
        pixKey: formData.pixKey,
        contactNumber: formData.contactNumber,
        updatedAt: new Date(),
      })
      .where(eq(storeConfig.id, 1));

    revalidatePath("/", "layout");
    revalidatePath("/admin");

    return { success: true, message: "Configurações atualizadas!" };
  } catch (error) {
    console.error("Erro ao atualizar configurações:", error);
    return { success: false, message: "Falha ao salvar no banco." };
  }
}

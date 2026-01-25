import { useCheckoutStore } from "@/stores/checkout-store";
import { useCartStore } from "@/stores/cart-store";
import { useConfigStore } from "@/stores/config-store"; // Importamos o novo store

export const generateMessage = () => {
  const { name, address, payment } = useCheckoutStore.getState();
  const { cart } = useCartStore.getState();

  // Pegamos a chave PIX atualizada do banco de dados
  const { pixKey } = useConfigStore.getState();

  const orderProducts = cart
    .map((i) => `*${i.quantity}x* ${i.product.name}`)
    .join("\n");

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Lógica de Pagamento Refinada
  let paymentMsg = "";
  if (payment.method === "pix") {
    paymentMsg = `💳 *Pagamento:* PIX\n🔑 *Chave:* ${
      pixKey || "Consulte o lojista"
    }\n⚠️ _Envie o comprovante após o pagamento_`;
  } else if (payment.method === "card") {
    paymentMsg = `💳 *Pagamento:* Cartão (Levamos a maquininha)`;
  } else {
    const change = parseFloat(payment.change || "0");
    const diff = change - total;
    paymentMsg = `💵 *Pagamento:* Dinheiro\n💰 *Troco para:* R$ ${change.toFixed(
      2
    )}\n🔄 *Levar:* R$ ${diff > 0 ? diff.toFixed(2) : "0.00"} de troco`;
  }

  return `
🍔 *NOVO PEDIDO - ${new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })}*
----------------------------
👤 *Cliente:* ${name}
📍 *Endereço:* ${address.street}, ${address.number}
🏘️ *Bairro:* ${address.district}
${address.complement ? `🏢 *Comp:* ${address.complement}` : ""}
----------------------------
🛒 *ITENS:*
${orderProducts}
----------------------------
💰 *TOTAL:* R$ ${total.toFixed(2)}
${paymentMsg}
----------------------------
📱 _Pedido gerado pelo FastFood System_
`.trim();
};

import { useCheckoutStore } from "@/stores/checkout-store";
import { useCartStore } from "@/stores/cart-store";

export const generateMessage = () => {
  const { name, address, payment } = useCheckoutStore.getState();
  const { cart } = useCartStore.getState();

  const orderProducts = cart
    .map((i) => `*${i.quantity}x* ${i.product.name}`)
    .join("\n");
  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // CONDIÇÕES DE PAGAMENTO PARA O LOJISTA
  let paymentMsg = "";
  if (payment.method === "pix") {
    paymentMsg = `💳 *Pagamento:* PIX (Cliente avisado para enviar comprovante)`;
  } else if (payment.method === "card") {
    paymentMsg = `💳 *Pagamento:* Cartão (maquininha na entrega)`;
  } else {
    const change = parseFloat(payment.change || "0");
    paymentMsg = `💵 *Pagamento:* Dinheiro\n💰 *Troco para:* R$ ${change.toFixed(
      2
    )}\n🔄 *Levar:* R$ ${(change - total).toFixed(2)} de troco`;
  }

  return `
🍔 *NOVO PEDIDO* 🍔
----------------------------
👤 *Cliente:* ${name}
📍 *Endereço:* ${address.street}, ${address.number}
🏘️ *Bairro:* ${address.district}
----------------------------
🛒 *ITENS:*
${orderProducts}
----------------------------
💰 *TOTAL:* R$ ${total.toFixed(2)}
${paymentMsg}
----------------------------
`.trim();
};

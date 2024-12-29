import { useCheckoutStore } from "@/stores/checkout-store"
import { Button } from "../ui/button"
import Link from "next/link"
import { generateMessage } from "@/lib/generate-message"

export const StepFinish = ()=>{
  const { name } = useCheckoutStore(state => state)

  const msg = generateMessage();
  const linkWPP = `https://wa.me//${process.env.NEXT_PUBLIC_ZAP}?text=${encodeURI(msg)}`

  return(
    <div className="text-center flex flex-col gap-5">
      <p>Perfeito <strong>{name}</strong>!</p>
      <p>Agora envie seu pedido para o nosso WhatsApp para concluir.</p>
      <Button>
        <Link target="_blank" href={linkWPP}>Enviar para o WhatsApp</Link>
      </Button>
    </div>
  )
}
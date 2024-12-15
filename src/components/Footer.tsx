import { Separator } from "@/components/ui/separator";

export const Footer = () =>{
  return(
    <footer className = "mt-5">
        <Separator />
        <div className="my-5 opacity-10 text-center text sm">
          Criador por <a 
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/luiizj/">Luiz</a>
        </div>
    </footer>
  )
}
export default Footer;
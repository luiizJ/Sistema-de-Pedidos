import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sidebar } from "@/components/Cart/Sidebar";

export const Header = () =>{
  return(
    <header className="flex justify-between items-center my-5 mx-3">
      <div className="flex items-center gap-3">
        <Logo />
        <ThemeToggle />
      </div>
        <div className="flex items-center gap-3">
        <Sidebar />
        </div>
    </header>
  )
}

export default Header;
"use client";

import Logo from "@/components/Logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sidebar } from "@/components/Cart/Sidebar";
import { useConfigStore } from "@/stores/config-store";

export const Header = () => {
  const { isOpen } = useConfigStore();

  return (
    <header className="my-5 mx-3 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3">
          <Sidebar />
        </div>
      </div>

      <div className="flex">
        <div
          className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm ${
            isOpen
              ? "bg-green-500/10 text-green-600 border border-green-500/20"
              : "bg-red-500/10 text-red-600 border border-red-500/20 animate-pulse"
          }`}
        >
          {isOpen ? "● Aberto" : "● Fechado"}
        </div>
      </div>
    </header>
  );
};

export default Header;

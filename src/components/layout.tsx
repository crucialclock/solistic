import { Outlet } from "react-router-dom"
import { Navbar } from "./creative/navbar"

export function RootLayout() {
  return (
    <div className="bg-background text-foreground flex min-h-screen w-full flex-col items-center font-sans">
      {/* Navbar fixa no topo */}
      <Navbar />

      {/* O CONTAINER GLOBAL: 
          Tudo que for renderizado dentro das páginas (Outlet) 
          seguirá automaticamente esse max-w e padding.
      */}
      <main className="w-full max-w-7xl flex-1 px-8 md:px-12">
        <Outlet />
      </main>

      {/* FOOTER GLOBAL - Já com o mesmo espaçamento */}
      <footer className="border-foreground/10 w-full max-w-7xl border-t px-8 py-10 md:px-12">
        <div className="flex items-end justify-between">
          <div className="text-sm font-black">
            © {new Date().getFullYear()} SOLISTIC
          </div>
          <div className="text-[10px] font-bold tracking-widest uppercase opacity-40">
            São Paulo / BR
          </div>
        </div>
      </footer>
    </div>
  )
}

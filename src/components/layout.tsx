import { Outlet } from "react-router-dom"
import { Navbar } from "./creative/navbar"

export function RootLayout() {
  return (
    <div className="bg-background text-foreground flex min-h-screen w-full flex-col items-center overflow-x-clip font-sans">
      <Navbar />

      {/* Removido o max-w daqui para permitir que elementos internos vazem para as bordas da tela */}
      <main className="w-full flex-1">
        <Outlet />
      </main>

      <footer className="border-foreground/10 w-full max-w-7xl border-t px-8 py-10 md:px-12">
        <div className="flex items-end justify-between">
          <div className="text-sm font-black tracking-tighter uppercase">
            © {new Date().getFullYear()} SOLISTIC
          </div>
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
            São Paulo / BR
          </div>
        </div>
      </footer>
    </div>
  )
}

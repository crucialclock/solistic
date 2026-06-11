import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Logo } from "./logo"
import { Link, useLocation } from "react-router-dom"

// Links institucionais padrão
const MENU_ITEMS = [
  { label: "Início", to: "/" },
  { label: "Serviços Oferecidos", to: "/servicos" },
  { label: "Orçamento", to: "/orcamento" },
]

interface NavLinksListProps {
  mobile?: boolean
}

// Lista apenas os links institucionais para não embolar com o fluxo de autenticação
const NavLinksList = ({ mobile = false }: NavLinksListProps) => {
  return (
    <>
      {MENU_ITEMS.map((item) =>
        mobile ? (
          <Link
            key={item.to}
            to={item.to}
            className="text-xs font-bold tracking-[0.2em] uppercase opacity-70 transition-opacity hover:opacity-100"
          >
            {item.label}
          </Link>
        ) : (
          <Button
            key={item.to}
            variant="ghost"
            asChild
            className="group relative h-9 cursor-pointer rounded-none px-0 text-xs font-bold tracking-widest uppercase transition-all hover:bg-transparent"
          >
            <Link to={item.to}>
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-full scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          </Button>
        )
      )}
    </>
  )
}

// Função utilitária rápida e segura para extrair privilégios sem gerar requisições de rede
function checkIsAdmin(token: string | null): boolean {
  if (!token) return false
  try {
    const payload = token.split(".")[1]
    const decoded = JSON.parse(atob(payload))
    return decoded.role === "ADMIN"
  } catch {
    return false
  }
}

export function Navbar() {
  // Força a atualização a cada troca de rota para reler o localStorage
  useLocation()

  const token = localStorage.getItem("token")
  const isAuthenticated = !!token
  const isAdmin = checkIsAdmin(token)

  return (
    <header className="border-foreground/10 bg-background flex w-full justify-center">
      <nav className="flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-12">
        <Logo />

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-8 md:flex">
          <ModeToggle />

          <div className="flex items-center gap-6">
            <NavLinksList />
          </div>

          {/* Botão Dinâmico Isolado — Evita quebras no mapeamento anterior */}
          <Button
            variant="ghost"
            asChild
            className="group relative h-9 cursor-pointer rounded-none px-0 text-xs font-bold tracking-widest uppercase transition-all hover:bg-transparent"
          >
            <Link to={isAuthenticated ? "/dashboard" : "/login"}>
              {isAuthenticated ? "Dashboard" : "Login"}
              <span className="absolute -bottom-1 left-0 h-px w-full scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          </Button>

          {/* LINK EXCLUSIVO DE ADMIN: Renderizado em background apenas se descriptografar o privilégio */}
          {isAdmin && (
            <Button
              variant="ghost"
              asChild
              className="group relative h-9 cursor-pointer rounded-none px-0 text-xs font-bold tracking-widest text-amber-500 uppercase transition-all hover:bg-transparent hover:text-amber-600"
            >
              <Link to="/admin">
                Painel Admin
                <span className="absolute -bottom-1 left-0 h-px w-full scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            </Button>
          )}
        </div>

        {/* MOBILE NAV */}
        <div className="flex items-center gap-4 md:hidden">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-none p-0 hover:bg-transparent focus-visible:ring-0"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-background border-foreground/10 z-100 w-64 rounded-none border-l p-8 shadow-none focus-visible:outline-none"
            >
              <div className="mt-8 flex flex-col gap-8">
                <nav className="flex flex-col gap-5">
                  <NavLinksList mobile />

                  {/* Link interno do Admin renderizado condicionalmente no menu mobile */}
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-xs font-bold tracking-[0.2em] text-amber-500 uppercase transition-opacity hover:opacity-80"
                    >
                      Painel Admin
                    </Link>
                  )}

                  {/* Link de autenticação no menu mobile */}
                  <Link
                    to={isAuthenticated ? "/dashboard" : "/login"}
                    className="text-xs font-bold tracking-[0.2em] uppercase opacity-70 transition-opacity hover:opacity-100"
                  >
                    {isAuthenticated ? "Dashboard" : "Login"}
                  </Link>
                </nav>

                <Button
                  asChild
                  className="bg-foreground text-background w-full rounded-none py-6 text-xs font-bold tracking-widest uppercase transition-opacity hover:opacity-90"
                >
                  <Link to="/orcamento">Orçar Projeto</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

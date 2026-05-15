import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Logo } from "./logo"
import { Link } from "react-router-dom"

// Configuração centralizada dos links para facilitar manutenção
const MENU_ITEMS = [
  { label: "Início", to: "/" },
  { label: "Projetos", to: "/projetos" },
  { label: "Serviços", to: "/servicos" },
  { label: "Orçamento", to: "/orcamento" },
]

const NavLinksList = ({ mobile = false }: { mobile?: boolean }) => {
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

export function Navbar() {
  return (
    <header className="border-foreground/10 bg-background flex w-full justify-center">
      <nav className="flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-12">
        <Logo />

        {/* DESKTOP NAV - Chama a lista de links */}
        <div className="hidden items-center gap-8 md:flex">
          <ModeToggle />
          <NavLinksList />
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
                  {/* Reaproveita a mesma lista, mas com estilo mobile */}
                  <NavLinksList mobile />
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

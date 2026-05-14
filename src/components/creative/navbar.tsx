import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Logo } from "./logo"

export function Navbar() {
  return (
    <header className="border-foreground/10 bg-background flex w-full justify-center">
      <nav className="p flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-12">
        <Logo></Logo>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-8 md:flex">
          <ModeToggle />
          <Button
            variant="ghost"
            className="group relative h-9 cursor-pointer rounded-none px-0 text-xs font-bold tracking-widest uppercase transition-all hover:bg-transparent"
          >
            Orçamento
            <span className="absolute -bottom-1 left-0 h-px w-full scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </Button>
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
              /* Adicionado bg-background SEM transparência e z-index alto */
              className="bg-background border-foreground/10 sheet-content-shadow-fix z-100 w-64 rounded-none border-l p-8 opacity-100! shadow-none focus-visible:outline-none"
            >
              <div className="mt-8 flex flex-col gap-8">
                <nav className="flex flex-col gap-5">
                  <a
                    href="#"
                    className="text-xs font-bold tracking-[0.2em] uppercase opacity-70 transition-opacity hover:opacity-100"
                  >
                    Início
                  </a>
                  <a
                    href="#"
                    className="text-xs font-bold tracking-[0.2em] uppercase opacity-70 transition-opacity hover:opacity-100"
                  >
                    Projetos
                  </a>
                  <a
                    href="#"
                    className="text-xs font-bold tracking-[0.2em] uppercase opacity-70 transition-opacity hover:opacity-100"
                  >
                    Serviços
                  </a>
                </nav>
                <Button className="bg-foreground text-background w-full rounded-none py-6 text-xs font-bold tracking-widest uppercase transition-opacity hover:opacity-90">
                  Orçar Projeto
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

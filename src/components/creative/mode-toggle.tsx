import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "../theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group relative h-9 w-auto cursor-pointer rounded-none px-0 transition-all hover:bg-transparent"
    >
      <Sun className="h-4 w-4 scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0" />

      <span className="absolute -bottom-1 left-0 h-px w-full scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />

      <span className="sr-only">Alternar tema</span>
    </Button>
  )
}

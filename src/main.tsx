import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { Orcamento } from "./pages/orcamento/page.tsx"
import { Projetos } from "./pages/projetos/page.tsx"
import { Servicos } from "./pages/servicos/page.tsx"
import { RootLayout } from "./components/layout.tsx"
import App from "./App.tsx"

// Configuração das rotas
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />, // O Layout pai com a Navbar
      children: [
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/orcamento",
          element: <Orcamento></Orcamento>,
        },
        {
          path: "/servicos",
          element: <Servicos></Servicos>,
        },
        {
          path: "/projetos",
          element: <Projetos></Projetos>,
        },
      ],
    },
  ],
  {
    basename: "/solistic",
  }
)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
      disableTransitionOnChange={false}
    >
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)

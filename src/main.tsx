import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { Orcamento } from "./pages/orcamento/page.tsx"
import { Projetos } from "./pages/projetos/page.tsx"
import { Servicos } from "./pages/servicos/page.tsx"
import { RootLayout } from "./components/layout.tsx"
import { AuthGuard } from "./components/auth-guard.tsx"
import Login from "./pages/login/page.tsx"
import Registro from "./pages/registro/page.tsx"
import App from "./App.tsx"
import { Dashboard } from "./pages/dashboard/page.tsx"

// Configuração das rotas completas
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />, // Layout pai uniforme
      children: [
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/registro",
          element: <Registro />,
        },
        {
          path: "/orcamento",
          element: <Orcamento />,
        },
        {
          path: "/servicos",
          element: <Servicos />,
        },
        {
          path: "/projetos",
          element: <Projetos />,
        },

        // Exemplo de escopo protegido usando a Http Guard no React
        {
          element: <AuthGuard />,
          children: [
            {
              path: "/dashboard",
              element: <Dashboard />, // Agora sim chama o componente real
            },
          ],
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

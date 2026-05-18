import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./index.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { Projetos } from "./pages/projetos/page.tsx"
import { RootLayout } from "./components/layout.tsx"
import { AuthGuard } from "./components/auth-guard.tsx"
import Login from "./pages/login/page.tsx"
import Registro from "./pages/registro/page.tsx"
import App from "./App.tsx"
import { Orcamento } from "./pages/orcamento/page.tsx"
import { QuoteDetails } from "./pages/detalhes-orcamento/QuoteDetails.tsx"
import { Dashboard } from "./pages/dashboard/page.tsx"
import { AdminDashboard } from "./pages/admin/page.tsx"
// 1. Importe a sua nova página de administração aqui

// Configuração das rotas completas
const router = createBrowserRouter([
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
        path: "/orcamento/:id",
        element: <QuoteDetails />,
      },
      {
        path: "/projetos",
        element: <Projetos />,
      },

      // Escopo protegido usando o AuthGuard
      {
        element: <AuthGuard />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/admin",
            element: <AdminDashboard />,
          },
        ],
      },
    ],
  },
])

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

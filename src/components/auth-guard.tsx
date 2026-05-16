import { Navigate, Outlet } from "react-router-dom"

export function AuthGuard() {
  const isAuthenticated = !!localStorage.getItem("token")

  // Se não estiver autenticado, joga o usuário de volta para o login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Se estiver autenticado, renderiza a rota filha interna (Outlet)
  return <Outlet />
}

import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333"

console.log("[API] URL Base configurada para:", API_URL)

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor de Requisição (Saída)
api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token")

    console.log(
      `[API Request] Disparando para: ${config.method?.toUpperCase()} ${config.url}`
    )
    console.log("[API Request] Token encontrado no localStorage:", token)

    if (token && config.headers) {
      token = token.replace(/"/g, "")
      const authHeader = token.startsWith("Bearer ") ? token : `Bearer ${token}`
      config.headers.Authorization = authHeader
      console.log("[API Request] Header Authorization injetado com sucesso.")
    } else {
      console.log(
        "[API Request] Nenhuma credencial anexada (Requisição pública ou sem login)."
      )
    }

    return config
  },
  (error) => {
    console.error("[API Request Error] Falha antes do disparo:", error)
    return Promise.reject(error)
  }
)

// Interceptor de Resposta (Chegada) — ESSENCIAL PARA VER O LOGIN
api.interceptors.response.use(
  (response) => {
    console.log(
      `[API Response Success] Status ${response.status} de: ${response.config.method?.toUpperCase()} ${response.config.url}`
    )

    // Se for a rota de login, vamos inspecionar o que o servidor devolveu
    if (response.config.url?.includes("/auth/login")) {
      console.log(
        "[API Login Response] Payload completo retornado pela API:",
        response.data
      )
    }

    return response
  },
  (error) => {
    console.error(`[API Response Error] Falha na comunicação:`)
    if (error.response) {
      console.error(
        `- Status retornado pelo servidor: ${error.response.status}`
      )
      console.error(`- Mensagem/Dados da API:`, error.response.data)
    } else {
      console.error(
        `- Erro de rede ou servidor offline. Sem resposta estruturada.`,
        error.message
      )
    }
    return Promise.reject(error)
  }
)

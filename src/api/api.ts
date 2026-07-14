import axios from "axios";

// В проде REST идёт через прокси Vercel (/api -> Render), чтобы куки были
// первопартийными — иначе мобильные браузеры (Safari ITP) их блокируют.
// WebSocket Vercel не проксирует, поэтому он ходит на Render напрямую
// и авторизуется токеном из query, а не кукой.
export const BACKEND_URL: string = import.meta.env.DEV
  ? import.meta.env.VITE_BACKEND_URL
  : '/api'

const WS_BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL

export const wsUrl = (path: string) =>
  WS_BACKEND_URL.replace(/^http/, 'ws') + path

export const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
})

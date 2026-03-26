import axios from "axios";

const VITE_BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL

export const api = axios.create({
baseURL: VITE_BACKEND_URL,
withCredentials:true
})
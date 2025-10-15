import { User } from "@/contexts/AuthContext";


export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = import.meta.env.VITE_BASE_URL;

  const user: User |  = localStorage.getItem("userData")
  const token: string = user?.token;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${url}${endpoint}`, {
    ...options,
    headers,
  });


}

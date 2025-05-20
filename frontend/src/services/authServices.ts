// src/services/authService.ts
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

const API_BASE_URL = "http://localhost:3001";

export async function login(email: string, password: string): Promise<AuthUser | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/users?email=${email}&password=${password}`);
    if (!res.ok) throw new Error("Erro ao conectar ao servidor");

    const users = await res.json();
    return users.length > 0 ? users[0] : null;
  } catch (err) {
    console.error("Erro no login:", err);
    return null;
  }
}


export async function register(name: string, email: string, password: string) {
  const res = await fetch(API_BASE_URL+"/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
      role: "Customer", // padrão
    }),
  });

  if (!res.ok) return null;
  return res.json();
}
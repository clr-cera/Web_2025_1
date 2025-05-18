// src/services/adminService.ts

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const API_URL = "http://localhost:3001";

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_URL}/users`);

  if (!res.ok) {
    throw new Error("Erro ao buscar usuários");
  }

  return res.json();
}

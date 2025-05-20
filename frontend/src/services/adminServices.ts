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


// Criar novo admin
export async function createUser(data: Omit<User, "id">): Promise<User> {
  console.log(data)
  if (!data.name || !data.email || !data.role) {
    throw new Error("Campos obrigatórios ausentes");
  }

  const res = await fetch(API_URL + "/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao criar usuário");
  return res.json();
}

// Atualizar admin
export async function updateUser(id: number, data: Partial<User>): Promise<User> {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao atualizar usuário");
  return res.json();
}

// Deletar admin
export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao deletar usuário");
}
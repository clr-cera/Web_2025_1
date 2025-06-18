// Tipo que representa a estrutura de um usuário
export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
};

// URL base da API (ajuste conforme ambiente de produção)
const API_URL = "http://element.clr.dev.br/api";

/**
 * Busca todos os usuários da API
 */
export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_URL}/users`, {
    headers: {
      "Authorization": localStorage.getItem("token") || ""
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar usuários");
  }

  return res.json();
}

/**
 * Cria um novo usuário (admin ou outro)
 * @param data - Dados do usuário sem o ID
 */
export async function createUser(data: Omit<User, "id">): Promise<User> {
  // Validação básica
  if (!data.name || !data.email || !data.role || !data.password) {
    throw new Error("Campos obrigatórios ausentes");
  }

  const res = await fetch(API_URL + "/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token") || ""
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao criar usuário");
  return res.json();
}

/**
 * Atualiza um usuário existente
 * @param id - ID do usuário a ser atualizado
 * @param data - Dados parciais para atualização
 */
export async function updateUser(email: string, data: Partial<User>): Promise<User> {
  const res = await fetch(`${API_URL}/users/${email}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token") || ""
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao atualizar usuário");
  return res.json();
}

/**
 * Deleta um usuário pelo ID
 */
export async function deleteUser(email: string): Promise<void> {
  const res = await fetch(`${API_URL}/users/${email}`, {
    headers: {
      "Authorization": localStorage.getItem("token") || ""
    },
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Erro ao deletar usuário");
}

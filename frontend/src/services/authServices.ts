// Interface que define os dados do usuário autenticado
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

// URL base da API utilizada
const API_BASE_URL = "http://localhost:3001";

/**
 * Função de login
 * Verifica se existe um usuário com o email e senha informados
 * Retorna o usuário autenticado ou null caso não exista
 */
export async function login(email: string, password: string): Promise<AuthUser | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/users?email=${email}&password=${password}`);
    if (!res.ok) throw new Error("Erro ao conectar ao servidor");

    const users = await res.json();
    return users.length > 0 ? users[0] : null; // retorna o primeiro usuário encontrado (email único)
  } catch (err) {
    console.error("Erro no login:", err);
    return null;
  }
}

/**
 * Função de registro
 * Cria um novo usuário com a role padrão "Customer"
 */
export async function register(name: string, email: string, password: string) {
  const res = await fetch(API_BASE_URL + "/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
      role: "Customer", // atribui papel padrão
    }),
  });

  if (!res.ok) return null;
  return res.json();
}

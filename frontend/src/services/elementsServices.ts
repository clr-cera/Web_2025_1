// Tipo que representa um elemento químico
export type ElementType = {
  id: string;
  atomic_number: number;
  atomic_mass: number;
  symbol: string;
  name: string;
  description: string;
  category: string; // Ex: "Metals", "Non-Metals", "Noble Gases"
  state: string; // Ex: "Solid", "Gas"
  price: number;
  stock: number;
  row?: number; // Posição na tabela periódica (linha)
  column?: number; // Posição na tabela periódica (coluna)
  image_url?: string; // Link para a imagem do elemento
};

// URL base da API usada para comunicação com o backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Busca todos os elementos disponíveis na API
 */
export async function fetchAllElements(): Promise<ElementType[]> {
  console.log("API_URL:", API_BASE_URL);
  const res = await fetch(`${API_BASE_URL}/elements`);
  if (!res.ok) {
    throw new Error("Erro ao buscar elementos");
  }
  const data = await res.json();
  for (const element of data) {
    element.id = element._id
  }
  return data;
}

/**
 * Busca elementos com base na categoria selecionada.
 * Se for "All Elements", retorna todos sem filtro.
 */
export async function fetchElementsByCategory(category: string): Promise<ElementType[]> {
  const query = category === "All Elements" ? "" : '/category/' + category;
  const res = await fetch(`${API_BASE_URL}/elements${query}`);
  if (!res.ok) {
    throw new Error("Erro ao buscar elementos");
  }
  const data = await res.json();
  for (const element of data) {
    element.id = element._id
  }
  return data;
}

/**
 * Busca um único elemento pelo nome.
 * Retorna o primeiro encontrado (o nome é considerado único).
 */
export async function fetchElementByName(name: string): Promise<ElementType | undefined> {
  const res = await fetch(`${API_BASE_URL}/elements/name/${name}`);
  if (!res.ok) throw new Error("Erro ao buscar elemento");
  const data = await res.json();
  data.id = data._id; // Ajusta o ID para o formato esperado
  return data; // A busca retorna um array; pegamos o primeiro
}

/**
 * Usado para carregar os produtos no painel de administração.
 * Atualmente, apenas um alias para fetchAllElements().
 */
export async function fetchDashboardProducts(): Promise<ElementType[]> {
  const res = await fetch(`${API_BASE_URL}/elements`);
  if (!res.ok) {
    throw new Error("Erro ao carregar produtos");
  }
  const data = await res.json();
  for (const element of data) {
    element.id = element._id
  }
  return data;
}

/**
 * Cria um novo elemento químico (produto) no backend.
 * O ID é gerado automaticamente no servidor.
 */
export async function createElement(data: Omit<ElementType, "id">): Promise<ElementType> {
  const res = await fetch(`${API_BASE_URL}/elements`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token") || ""
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao criar produto");
  return res.json();
}

/**
 * Atualiza os dados de um elemento existente usando seu ID.
 * Apenas os campos alterados precisam ser enviados (Partial).
 */
export async function updateElement(id: string, data: Partial<ElementType>): Promise<ElementType> {
  const res = await fetch(`${API_BASE_URL}/elements/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token") || ""
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao atualizar produto");
  const resdata = await res.json();
  for (const element of resdata) {
    element.id = element._id
  }
  return resdata;
}

/**
 * Deleta um elemento da base usando seu ID.
 */
export async function deleteElement(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/elements/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": localStorage.getItem("token") || ""
    },
  });

  if (!res.ok) throw new Error("Erro ao deletar produto");
}

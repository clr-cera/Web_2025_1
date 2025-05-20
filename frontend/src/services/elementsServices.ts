// src/services/elementService.ts

export type ElementType = {
  id: string;
  atomic_number: number;
  atomic_mass: number;
  symbol: string;
  name: string;
  description: string;
  category: string;
  state: string;
  price: number;
  stock: number;
  row?: number;
  column?: number;
};

const API_BASE_URL = "http://localhost:3001";

export async function fetchAllElements(): Promise<ElementType[]> {
  const res = await fetch(`${API_BASE_URL}/elements`);

  if (!res.ok) {
    throw new Error("Erro ao buscar elementos");
  }

  return res.json();
}


export async function fetchElementsByCategory(category: string): Promise<ElementType[]> {
  const query = category === "All Elements" ? "" : `?category=${encodeURIComponent(category)}`;
  const res = await fetch(`http://localhost:3001/elements${query}`);

  if (!res.ok) {
    throw new Error("Erro ao buscar elementos");
  }

  return res.json();
}


export async function fetchElementByName(name: string): Promise<ElementType | undefined> {
  const res = await fetch(`http://localhost:3001/elements?name=${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error("Erro ao buscar elemento");

  const data = await res.json();
  return data[0]; // Como a busca retorna um array, pegamos o primeiro item
}



export async function fetchDashboardProducts(): Promise<ElementType[]> {
  const res = await fetch("http://localhost:3001/elements");

  if (!res.ok) {
    throw new Error("Erro ao carregar produtos");
  }

  const elements = await res.json();

  return elements;
}

// Criar novo produto
export async function createElement(data: Omit<ElementType, "id">): Promise<ElementType> {
  const res = await fetch(`${API_BASE_URL}/elements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erro ao criar produto");
  return res.json();
}

// Atualizar produto
export async function updateElement(id: string, data: Partial<ElementType>): Promise<ElementType> {
  const res = await fetch(`${API_BASE_URL}/elements/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar produto");
  return res.json();
}

// Deletar produto
export async function deleteElement(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/elements/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao deletar produto");
}
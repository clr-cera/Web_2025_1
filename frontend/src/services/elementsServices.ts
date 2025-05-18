// src/services/elementService.ts

export type ElementType = {
  atomic_number: number;
  atomic_mass: number;
  symbol: string;
  name: string;
  description: string;
  category: string;
  state: string;
  price: number;
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



export async function fetchDashboardProducts(): Promise<{ id: number; name: string; price: number; stock: number }[]> {
  const res = await fetch("http://localhost:3001/elements");

  if (!res.ok) {
    throw new Error("Erro ao carregar produtos");
  }

  const elements = await res.json();

  // Mapeia os dados para o formato que o ProductsTable espera
  return elements.map((e: any, index: number) => ({
    id: e.atomic_number,
    name: e.name,
    price: e.price.toFixed(2),
    stock: e.stock,
  }));
}


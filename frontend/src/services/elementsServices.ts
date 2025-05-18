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


// src/services/elementService.ts

export async function fetchElementsByCategory(category: string): Promise<ElementType[]> {
  const query = category === "All Elements" ? "" : `?category=${encodeURIComponent(category)}`;
  const res = await fetch(`http://localhost:3001/elements${query}`);

  if (!res.ok) {
    throw new Error("Erro ao buscar elementos");
  }

  return res.json();
}


// src/services/elementService.ts

export async function fetchElementByName(name: string): Promise<ElementType | undefined> {
  const res = await fetch(`http://localhost:3001/elements?name=${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error("Erro ao buscar elemento");

  const data = await res.json();
  return data[0]; // Como a busca retorna um array, pegamos o primeiro item
}


"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define o formato dos dados disponíveis no contexto
type SearchContextType = {
  searchQuery: string; // texto digitado pelo usuário
  setSearchQuery: (query: string) => void; // função para atualizar o texto
};

// Criação do contexto com valor inicial indefinido
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Provedor do contexto — envolve partes da aplicação que precisam acessar a busca
export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState(""); // estado que armazena a busca

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

// Hook personalizado para acessar o contexto de forma segura
export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within SearchProvider");
  return context;
}

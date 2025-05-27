"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext"; // Importa o contexto do carrinho para interagir com ele ao fazer logout

// Tipagem do usuário logado
interface User {
  id: string;
  name: string;
  email: string;
  role: string; // pode ser "Customer", "Admin", etc.
}

// Interface com as funções e dados disponíveis para quem usa o contexto
interface AuthContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Cria o contexto de autenticação
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Componente provider responsável por fornecer o contexto para o app
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { clearCart } = useCart(); // Função para limpar carrinho ao deslogar

  // Ao carregar o componente, tenta recuperar o usuário salvo no localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null); // Se algo der errado, limpa o estado
      }
    }
  }, []);

  // Função para logar o usuário e salvar no localStorage
  const login = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  // Função para deslogar o usuário, limpar o carrinho e redirecionar
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    clearCart(); // Remove todos os itens do carrinho
    router.push("/"); // Redireciona para a home
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação de forma simples
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

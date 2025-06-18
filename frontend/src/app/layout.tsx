// Metadados e estilos globais
import type { Metadata } from "next";
import "@/styles/globals.css";

// Fonte principal
import { Inter } from "next/font/google";

// Componentes globais e contextos
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SearchProvider } from "@/context/SearchContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import ToasterClient from "./components/ToasterClient";

// Inicializa a fonte Inter como variável CSS global
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Metadados padrão da aplicação
export const metadata: Metadata = {
  title: "Elements_store",
  description: "Elements store",
};

// Layout principal aplicado a todas as páginas
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* Aplica a fonte Inter usando a classe CSS da variável */}
      <body className={inter.variable}>
        {/* Componente para mostrar mensagens (ex: sucesso, erro) via toast */}
        <ToasterClient />
        {/* CartProvider: mantém os dados do carrinho acessíveis em qualquer parte do app */}
        <CartProvider>
          {/* AuthProvider: gerencia autenticação e informações do usuário logado */}
          <AuthProvider>
            {/* SearchProvider: gerencia o estado da busca (texto digitado no search bar) */}
            <SearchProvider>
              {/* Header fixo com navegação principal e search bar */}
              <Header />
              {/* children: conteúdo da página atual */}
              {children}
              {/* Rodapé com links ou informações gerais */}
              <Footer />
            </SearchProvider>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}

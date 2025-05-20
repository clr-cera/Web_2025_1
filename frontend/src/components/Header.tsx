"use client";

import Link from "next/link";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSearch } from "@/context/SearchContext";
import { useCart } from "@/context/CartContext";
import CartModal from "@/components/CartModal";
import { useAuth } from "@/context/AuthContext";

// Componente do cabeçalho que aparece em todas as páginas
// Contém logo, navegação, barra de pesquisa, ícone do carrinho e menu responsivo
export default function Header() {
  const pathname = usePathname(); // Detecta a página atual
  const isHomePage = pathname === "/"; // Mostra a barra de busca apenas na home

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controle do menu mobile
  const [isCartOpen, setIsCartOpen] = useState(false); // Controle do modal do carrinho

  const { cartItems } = useCart(); // Itens do carrinho
  const { setSearchQuery } = useSearch(); // Atualiza a busca
  const { user, logout } = useAuth(); // Info do usuário logado

  return (
    <>
      {/* Cabeçalho fixo no topo */}
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md md:px-6 md:py-4 fixed t-0 w-full z-50">
        {/* Logo do site */}
        <div className="flex-shrink-0">
          <h1 className="text-xl md:text-2xl text-primary-blue font-bold">
            <Link href="/">ElementStore</Link>
          </h1>
        </div>

        {/* Campo de busca (aparece só na homepage) */}
        {isHomePage && (
          <div className="hidden md:flex flex-grow max-w-2xl mx-5">
            <form className="w-full" role="search">
              <input
                type="text"
                id="searchBar"
                placeholder="Search elements..."
                className="border rounded-md border-primary-gray px-4 py-2 w-full text-text-gray-darker"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="sr-only">Search</button>
            </form>
          </div>
        )}

        {/* Ícones de menu e carrinho */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Botão do menu (versão mobile) */}
          <button
            className="md:hidden text-primary-blue"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Links de navegação */}
          <nav
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute top-14 left-0 w-full bg-white shadow-md md:static md:flex md:space-x-6 md:bg-transparent md:shadow-none`}
            aria-label="Main navigation"
          >
            <ul className="flex flex-col md:flex-row md:space-x-2 text-text-gray">
              <li><Link href="/Elements" className="block px-4 py-2 hover:text-primary-blue font-medium">Elements</Link></li>
              <li><Link href="/Table" className="block px-4 py-2 hover:text-primary-blue font-medium">Table</Link></li>
              <li><Link href="/About" className="block px-4 py-2 hover:text-primary-blue font-medium">About</Link></li>

              {/* Login visível se usuário não estiver logado */}
              {!user && (
                <li><Link href="/Login" className="block px-4 py-2 hover:text-primary-blue font-medium">Login</Link></li>
              )}

              {/* Admin só visível para usuários com permissão */}
              {(user?.role === "Admin" || user?.role === "Super Admin") && (
                <li><Link href="/Admin" className="block px-4 py-2 hover:text-primary-blue font-medium">Admin</Link></li>
              )}

              {/* Logout visível se usuário estiver logado */}
              {user && (
                <li>
                  <button
                    onClick={logout}
                    className="block px-4 py-2 hover:text-red-600 cursor-pointer font-medium"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </nav>

          {/* Botão do carrinho */}
          <div className="flex-shrink-0">
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View cart"
              className="flex items-center gap-2 text-text-gray hover:text-primary-blue relative cursor-pointer"
            >
              <FiShoppingCart size={24} />
              {cartItems.length > 0 && (
                <p className="h-5 w-5 flex justify-center items-center absolute text-white bg-primary-blue rounded-full text-xs left-3 top-2">
                  {cartItems.length}
                </p>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Modal do carrinho (abre quando o ícone é clicado) */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

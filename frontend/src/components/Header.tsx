"use client";

import Link from "next/link";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
    const pathname = usePathname(); // Obtem o pathname atual da URL
    const isHomePage = pathname === "/"; // Verifica se a página atual é a home page
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para o menu mobile

    return (
        <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md md:px-6 md:py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
                <h1 className="text-xl md:text-2xl text-primary-blue font-bold">
                    <Link href="/">ElementStore</Link>
                </h1>
            </div>

            {/* Search Bar */}
            {isHomePage && (
                <div className="hidden md:flex flex-grow max-w-2xl mx-5">
                    <form className="w-full" role="search">
                        <label htmlFor="searchBar" className="sr-only">Search elements</label>
                        <input
                            type="text"
                            id="searchBar"
                            placeholder="Search elements..."
                            className="border rounded-md border-primary-gray px-4 py-2 w-full text-text-gray-darker"
                        />
                        <button type="submit" className="sr-only">Search</button>
                    </form>
                </div>
            )}

            {/* Navigation e Carrinho */}
            <div className="flex items-center space-x-4 md:space-x-6">
                {/* Menu Mobile */}
                <button
                    className="md:hidden text-primary-blue"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                {/* Navegação Desktop */}
                <nav
                    className={`${
                        isMenuOpen ? "block" : "hidden"
                    } absolute top-14 left-0 w-full bg-white shadow-md md:static md:flex md:space-x-6 md:bg-transparent md:shadow-none`}
                    aria-label="Main navigation"
                >
                    <ul className="flex flex-col md:flex-row md:space-x-6 text-text-gray">
                        <li>
                            <Link href="/Elements" className="block px-4 py-2 hover:text-primary-blue font-medium">
                                Elements
                            </Link>
                        </li>
                        <li>
                            <Link href="/#table" className="block px-4 py-2 hover:text-primary-blue font-medium">
                                Table
                            </Link>
                        </li>
                        <li>
                            <Link href="/About" className="block px-4 py-2 hover:text-primary-blue font-medium">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/Login" className="block px-4 py-2 hover:text-primary-blue font-medium">
                                Admin
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Carrinho */}
                <div className="flex-shrink-0">
                    <Link href="/cart" aria-label="View cart" className="flex items-center gap-2 text-text-gray hover:text-primary-blue relative">
                        <FiShoppingCart size={24} />
                        <p className="h-6 w-6 flex justify-center items-center absolute text-white bg-primary-blue rounded-2xl font-semibold left-3 top-2">1</p>
                    </Link>
                </div>
            </div>
        </header>
    );
}
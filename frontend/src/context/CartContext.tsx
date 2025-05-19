// src/context/CartContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ElementType } from "@/services/elementsServices";

// Tipo do item no carrinho
export type CartItem = ElementType & {
  quantity: number;
};

// Interface do contexto
interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: ElementType) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  getTotal: () => number;
  clearCart: () => void;
}

// Criação do contexto
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Provider
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Carregar do localStorage ao iniciar
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: ElementType) => {
    setCartItems(prev => {
      const exists = prev.find(p => p.id === item.id);
      if (exists) {
        return prev.map(p => p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(p => p.id !== id));
  };

  const increaseQuantity = (id: string) => {
    setCartItems(prev =>
      prev.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p)
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems(prev =>
      prev.map(p =>
        p.id === id ? { ...p, quantity: Math.max(p.quantity - 1, 1) } : p
      )
    );
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para consumir
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro do CartProvider");
  return context;
};

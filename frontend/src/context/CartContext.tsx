"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ElementType } from "@/services/elementsServices";
import toast from "react-hot-toast"; // para feedback visual

export type CartItem = ElementType & {
  quantity: number;
};

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: ElementType) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  getTotal: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: ElementType) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);

      if (existingItem) {
        if (existingItem.quantity >= item.stock) {
          toast.error("Estoque insuficiente");
          return prevItems;
        }
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      if (item.stock > 0) {
        return [...prevItems, { ...item, quantity: 1 }];
      } else {
        toast.error("Item fora de estoque.");
        return prevItems;
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (item.quantity >= item.stock) {
            toast.error("Estoque insuficiente");
            return item;
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
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

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro do CartProvider");
  return context;
};

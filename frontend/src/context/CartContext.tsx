"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ElementType } from "@/services/elementsServices";
import { finalizePurchaseService } from "@/services/purchaseService"; // Importa o serviço de compra
import toast from "react-hot-toast"; // Notificações visuais

// Tipo do item no carrinho (elemento com quantidade)
export type CartItem = ElementType & {
  quantity: number;
};

// Interface do contexto do carrinho
interface CartContextProps {
  cartItems: CartItem[]; // Lista de itens no carrinho
  addToCart: (item: ElementType) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  getTotal: () => number;
  clearCart: () => void;
  finalizePurchase: () => Promise<void>;
}

// Criação do contexto
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Provider que envolve a aplicação
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Recupera carrinho do localStorage ao montar
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  // Atualiza o localStorage sempre que o carrinho muda
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Adiciona um item ao carrinho ou incrementa quantidade se já existir
  const addToCart = (item: ElementType) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);

      if (existingItem) {
        // Impede ultrapassar o estoque
        if (existingItem.quantity >= item.stock) {
          toast.error("Insufficient stock");
          return prevItems;
        }
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      if (item.stock > 0) {
        return [...prevItems, { ...item, quantity: 1 }];
      } else {
        toast.error("Item out of stock.");
        return prevItems;
      }
    });
  };

  // Remove completamente um item do carrinho
  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Aumenta a quantidade de um item no carrinho
  const increaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (item.quantity >= item.stock) {
            toast.error("Insufficient stock");
            return item;
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  // Diminui a quantidade (mínimo de 1)
  const decreaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  // Calcula o total do carrinho
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Limpa o carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // Finaliza a compra usando o serviço de compra
  const finalizePurchase = async () => {
    try {
      await finalizePurchaseService(cartItems); // Chama o serviço de compra
      clearCart(); // Limpa o carrinho após a compra
      toast.success("Purchase completed successfully!");
    } catch (error) {
      console.error("Error during purchase:", error);
      toast.error("An error occurred during the purchase.");
    }
  };

  // Torna as funções e dados acessíveis via context
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
        finalizePurchase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook customizado para usar o contexto de forma prática
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};

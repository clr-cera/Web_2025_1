"use client";

import React from "react";
import Modal from "@/components/Modal";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import CartItemCard from "./CartItemCard";

// Props esperadas para o modal do carrinho
interface CartModalProps {
  isOpen: boolean;        // Define se o modal está visível
  onClose: () => void;    // Função para fechar o modal
}

// Modal que exibe os itens do carrinho do usuário
const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, getTotal } = useCart(); // Acesso aos itens e total do carrinho
  const { user } = useAuth();                // Informações de autenticação
  const router = useRouter();                // Navegação entre páginas

  // Função chamada ao clicar em "Proceed to Checkout"
  const handleCheckout = () => {
    onClose(); // Fecha o modal primeiro

    // Se o usuário estiver logado, vai para Shipping. Senão, redireciona para Login.
    if (user) {
      router.push("/Shipping");
    } else {
      router.push("/Login");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Shopping Cart"
      widthClass="w-full sm:w-[600px]" // Define a largura do modal
    >
      <div className="flex flex-col gap-6">
        {/* Se o carrinho estiver vazio */}
        {cartItems.length === 0 ? (
          <p className="text-text-gray text-center">Your cart is empty.</p>
        ) : (
          // Renderiza cada item no carrinho
          cartItems.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))
        )}

        {/* Mostra o total e o botão de checkout se houver itens */}
        {cartItems.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center text-lg font-semibold text-black mb-4">
              <p>Total:</p>
              <p>${getTotal().toFixed(2)}</p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-primary-blue hover:bg-secondary-blue text-white font-semibold px-4 py-2 rounded cursor-pointer"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CartModal;

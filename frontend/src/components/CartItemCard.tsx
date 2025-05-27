// src/components/CartItemCard.tsx
"use client";

import { CartItem, useCart } from "@/context/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { PiTrashSimple } from "react-icons/pi";

interface CartItemCardProps {
  item: CartItem; // Produto que está no carrinho
}

// Componente para exibir um item do carrinho com controles de quantidade e remoção
export default function CartItemCard({ item }: CartItemCardProps) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart(); // Funções do contexto de carrinho

  return (
    <div className="text-black flex justify-between w-full py-4 border-b border-border-gray">
      
      {/* Área com o símbolo e nome do elemento */}
      <div className="flex gap-4 items-center">
        {/* Ícone com o símbolo do elemento */}
        <div className="w-13 h-13 bg-background-blue flex justify-center items-center rounded-full">
          <p className="text-primary-blue font-semibold text-lg">{item.symbol}</p>
        </div>

        {/* Nome e preço do elemento */}
        <div>
          <label className="font-semibold">{item.name}</label>
          <p className="text-xs text-text-gray">${item.price.toFixed(2)} per mol</p>
        </div>
      </div>

      {/* Controles de quantidade e botão de remover */}
      <div className="flex gap-6 items-center">
        <div className="flex gap-4 items-center">
          {/* Botão para diminuir quantidade */}
          <button
            onClick={() => decreaseQuantity(item.id)}
            className="text-black p-2 border-2 border-border-gray cursor-pointer rounded-md hover:bg-gray-100"
          >
            <FaMinus size={10} />
          </button>

          {/* Quantidade atual */}
          <p className="font-semibold text-black w-4 text-center">{item.quantity}</p>

          {/* Botão para aumentar quantidade */}
          <button
            onClick={() => increaseQuantity(item.id)}
            className="text-black p-2 border-2 border-border-gray cursor-pointer rounded-md hover:bg-gray-100"
          >
            <FaPlus size={10} />
          </button>
        </div>

        {/* Botão para remover item do carrinho */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="cursor-pointer"
          title="Remove"
        >
          <PiTrashSimple size={20} className="text-red-600" />
        </button>
      </div>
    </div>
  );
}

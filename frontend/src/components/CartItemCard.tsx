// src/components/CartItemCard.tsx
"use client";

import { CartItem, useCart } from "@/context/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { PiTrashSimple } from "react-icons/pi";

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className="text-black flex justify-between w-full py-4 border-b border-border-gray">
      <div className="flex gap-4 items-center">
        <div className="w-13 h-13 bg-background-blue flex justify-center items-center rounded-full">
          <p className="text-primary-blue font-semibold text-lg">{item.symbol}</p>
        </div>

        <div>
          <label className="font-semibold">{item.name}</label>
          <p className="text-xs text-text-gray">${item.price.toFixed(2)} per mol</p>
        </div>
      </div>

      <div className="flex gap-6 items-center">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => decreaseQuantity(item.id)}
            className="text-black p-2 border-2 border-border-gray cursor-pointer rounded-md hover:bg-gray-100"
          >
            <FaMinus size={10} />
          </button>

          <p className="font-semibold text-black w-4 text-center">{item.quantity}</p>

          <button
            onClick={() => increaseQuantity(item.id)}
            className="text-black p-2 border-2 border-border-gray cursor-pointer rounded-md hover:bg-gray-100"
          >
            <FaPlus size={10} />
          </button>
        </div>

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

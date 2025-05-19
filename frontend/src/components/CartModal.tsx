"use client";

import React from "react";
import Modal from "@/components/Modal";
import { useCart } from "@/context/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { PiTrashSimple } from "react-icons/pi";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getTotal,
  } = useCart();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Shopping Cart" widthClass="w-full sm:w-[600px]">
      <div className="flex flex-col gap-6">
        {cartItems.length === 0 ? (
          <p className="text-text-gray text-center">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="text-black flex justify-between w-full items-center">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-background-blue flex justify-center items-center rounded-full">
                  <p className="text-primary-blue font-semibold">{item.symbol}</p>
                </div>
                <div>
                  <label className="font-semibold">{item.name}</label>
                  <p className="text-xs text-text-gray">${item.price} per unit</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="text-black p-2 border border-border-gray rounded-md hover:bg-gray-100"
                >
                  <FaMinus size={10} />
                </button>
                <p className="font-semibold">{item.quantity}</p>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="text-black p-2 border border-border-gray rounded-md hover:bg-gray-100"
                >
                  <FaPlus size={10} />
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <PiTrashSimple size={18} />
                </button>
              </div>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center text-lg font-semibold text-black mb-4">
              <p>Total:</p>
              <p>${getTotal().toFixed(2)}</p>
            </div>

            <button
              onClick={() => alert("Proceeding to checkout...")}
              className="w-full bg-primary-blue hover:bg-secondary-blue text-white font-semibold px-4 py-2 rounded"
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

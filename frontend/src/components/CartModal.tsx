"use client";

import React from "react";
import Modal from "@/components/Modal";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import CartItemCard from "./CartItemCard";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, getTotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    onClose(); // Fecha o modal antes de navegar

    if (user) {
      router.push("/Shipping");
    } else {
      router.push("/Login");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Shopping Cart" widthClass="w-full sm:w-[600px]">
      <div className="flex flex-col gap-6">
        {cartItems.length === 0 ? (
          <p className="text-text-gray text-center">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))
        )}

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

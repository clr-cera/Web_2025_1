"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ShippingPage() {
  // Acesso ao carrinho e funções auxiliares
  const { cartItems, getTotal, finalizePurchase } = useCart();
  const router = useRouter();

  // Estado para armazenar os dados do formulário de entrega
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    cep: "",
    number: "",
  });

  // Atualiza os campos do formulário dinamicamente
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função executada ao clicar em "Finalizar Pedido"
  const handleCheckout = async () => {
    const allFilled = Object.values(formData).every(Boolean); // verifica se todos os campos estão preenchidos
    if (!allFilled) {
      toast.error("Please, enter all values.");
      return;
    }

    try {
      await finalizePurchase(); // Chama a função do CartContext para finalizar a compra
      toast.success("Purchase completed successfully!");
      router.push("/"); // Redireciona para a página inicial
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("An error occurred during the purchase.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row pt-24 px-5 lg:px-20 gap-10 min-h-screen bg-background-blue text-black">
      {/* RESUMO DO PEDIDO */}
      <div className="lg:w-1/2 w-full flex flex-col gap-5">
        <h2 className="text-2xl font-bold text-primary-blue">Order Summary</h2>
        <div className="bg-white rounded-2xl shadow-md border border-border-gray px-6 py-5 gap-4 w-full flex flex-col">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              {/* Lista de produtos no carrinho */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-200 py-3"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity}x ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-semibold text-primary-blue">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              {/* Total geral */}
              <div className="border-t border-gray-300 pt-3 flex justify-between font-semibold text-lg">
                <p>Total:</p>
                <p>${getTotal().toFixed(2)}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* FORMULÁRIO DE ENTREGA */}
      <div className="lg:w-1/2 w-full">
        <h2 className="text-2xl font-bold text-primary-blue mb-5">Shipping Information</h2>
        <div className="bg-white rounded-2xl shadow-md border border-border-gray px-6 py-6 flex flex-col gap-5">
          {/* Campos do formulário principal */}
          {[
            { label: "Full Name", name: "fullName" },
            { label: "Email", name: "email", type: "email" },
            { label: "Address", name: "address" },
            { label: "City", name: "city" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name} className="flex flex-col gap-1">
              <label className="font-medium text-sm text-text-gray">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                placeholder={`Type your ${label.toLowerCase()}`}
                className="w-full border border-border-gray rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-primary-blue transition"
              />
            </div>
          ))}

          {/* Campos menores lado a lado: CEP e Número */}
          <div className="flex flex-col sm:flex-row gap-5">
            {["cep", "number"].map((field) => (
              <div key={field} className="flex flex-col gap-1 w-full">
                <label className="font-medium text-sm text-text-gray">{field.toUpperCase()}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder={`Type your ${field}`}
                  className="w-full border border-border-gray rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-primary-blue transition"
                />
              </div>
            ))}
          </div>

          {/* Botão de finalização do pedido */}
          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className={`mt-6 w-full text-white font-semibold rounded-lg px-4 py-3 transition 
              ${cartItems.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary-blue hover:bg-secondary-blue cursor-pointer"
              }`}
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaMinus, FaPlus } from "react-icons/fa";
import { ElementType, fetchElementByName } from "@/services/elementsServices";
import { useCart } from "@/context/CartContext";

interface ProductPageProps {
  params: { name: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const name = params.name;
  const [elementData, setElementData] = useState<ElementType | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);


  const { addToCart } = useCart();


  // Funções para quantidade
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    const loadElement = async () => {
      try {
        const element = await fetchElementByName(name);
        if (!element) return notFound();
        setElementData(element);
      } catch (err) {
        console.error("Erro ao carregar elemento:", err);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    loadElement();
  }, [name]);

  if (loading) {
    return <p className="text-center mt-20 text-lg text-gray-500">Carregando...</p>;
  }

  if (!elementData) {
    return null; // Segurança extra, caso notFound falhe
  }

  return (
    <div className="flex flex-col lg:flex-row px-5 lg:px-20 gap-10 pt-30">
      {/* Imagem do elemento */}
      <div className="lg:w-1/2 flex justify-center items-center">
        <div className="bg-gray-200 w-full lg:w-[80%] aspect-square rounded-2xl relative">
          <div className="px-3 bg-primary-blue w-fit rounded-xl text-white text-lg absolute right-2 top-2">
            {elementData.symbol}
          </div>
        </div>
      </div>

      {/* Informações do elemento */}
      <div className="lg:w-1/2">
        <div className="w-full lg:w-[80%] flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-4xl lg:text-6xl text-black">{elementData.name}</h1>
            <p className="font-semibold text-3xl lg:text-4xl text-primary-blue">${elementData.price}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col bg-background-gray rounded-md pt-2 pb-5 px-4">
              <h4 className="font-medium text-lg text-text-gray">Atomic Number</h4>
              <p className="font-semibold text-lg text-black">{elementData.atomic_number}</p>
            </div>
            <div className="flex flex-col bg-background-gray rounded-md pt-2 pb-5 px-4">
              <h4 className="font-medium text-lg text-text-gray">Atomic Mass</h4>
              <p className="font-semibold text-lg text-black">{elementData.atomic_mass}</p>
            </div>
            <div className="flex flex-col bg-background-gray rounded-md pt-2 pb-5 px-4">
              <h4 className="font-medium text-lg text-text-gray">Category</h4>
              <p className="font-semibold text-lg text-black">{elementData.category}</p>
            </div>
            <div className="flex flex-col bg-background-gray rounded-md pt-2 pb-5 px-4">
              <h4 className="font-medium text-lg text-text-gray">State</h4>
              <p className="font-semibold text-lg text-black">{elementData.state}</p>
            </div>
          </div>

          <div>
            <p className="text-text-gray">{elementData.description}</p>
          </div>

          <div className="flex justify-between gap-10 items-center">
            <div className="flex gap-5 items-center">
              <button
                onClick={decrementQuantity}
                className="text-black p-2 border-2 border-border-gray rounded-md cursor-pointer hover:bg-gray-100"
              >
                <FaMinus size={15} />
              </button>
              <p className="font-semibold text-black text-xl">{quantity}</p>
              <button
                onClick={incrementQuantity}
                className="text-black p-2 border-2 border-border-gray rounded-md cursor-pointer hover:bg-gray-100"
              >
                <FaPlus size={15} />
              </button>
            </div>

            <button 
              className="bg-primary-blue-darker rounded flex w-full justify-center items-center gap-2 px-2 py-2 text-white cursor-pointer hover:bg-primary-blue transition duration-200"
              onClick={() => {
                if (elementData) {
                  for (let i = 0; i < quantity; i++) {
                    addToCart(elementData);
                  }
                  setQuantity(1)
                }
              }}
          
            >
              <FiShoppingCart size={20} />
              <span className="text-lg font-medium">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

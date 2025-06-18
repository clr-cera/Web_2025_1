"use client";

import { notFound, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaMinus, FaPlus } from "react-icons/fa";
import { ElementType, fetchElementByName } from "@/services/elementsServices";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const params = useParams();
  const name = params?.name;
  const [elementData, setElementData] = useState<ElementType | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    const loadElement = async () => {
      try {
        if (!name) return notFound();
        if (typeof name !== "string") return notFound();
        const element = await fetchElementByName(name);
        if (!element) return notFound();
        setElementData(element);
      } catch (err) {
        console.error("Error fetching element data:", err);
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

  if (!elementData) return null;

  return (
    <div className="flex flex-col lg:flex-row px-5 lg:px-20 gap-10 pt-30 mb-80 max-w-screen overflow-x-hidden">
      {/* Coluna da imagem */}
      <div className="lg:w-1/2 flex justify-center items-center">
        <div className="bg-gray-200 w-full lg:w-[80%] aspect-square rounded-2xl relative">
          {elementData.image_url ? (
            <img
              src={elementData.image_url}
              alt={elementData.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500">
              No Image Available
            </div>
          )}
          <div className="px-3 bg-primary-blue w-fit rounded-xl text-white text-lg absolute right-2 top-2">
            {elementData.symbol}
          </div>
        </div>
      </div>

      {/* Coluna com detalhes */}
      <div className="lg:w-1/2">
        <div className="w-full lg:w-[80%] flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold text-4xl lg:text-6xl text-black">{elementData.name}</h1>
            <p className="font-semibold text-3xl lg:text-4xl text-primary-blue">${elementData.price} per mol</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {[
              ["Atomic Number", elementData.atomic_number],
              ["Atomic Mass", elementData.atomic_mass],
              ["Category", elementData.category],
              ["State", elementData.state],
              ["Stock (mols)", elementData.stock],
            ].map(([label, value]) => (
              <div key={label as string} className="flex flex-col bg-background-gray rounded-md pt-2 pb-5 px-4">
                <h4 className="font-medium text-lg text-text-gray">{label}</h4>
                <p className="font-semibold text-lg text-black">{value}</p>
              </div>
            ))}
          </div>

          <p className="text-text-gray whitespace-pre-line break-words">{elementData.description}</p>

          {/* Controles de quantidade e botão de compra */}
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
                onClick={() => {
                  if (quantity >= elementData.stock) {
                    incrementQuantity()
                  }
                }}
                className="text-black p-2 border-2 border-border-gray rounded-md cursor-pointer hover:bg-gray-100"
              >
                <FaPlus size={15} />
              </button>
            </div>

            {/* Botão adicionar ao carrinho ou indisponível */}
            {elementData.stock === 0 ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className=" bg-primary-gray cursor-not-allowed rounded flex w-full justify-center items-center gap-2 px-2 py-2 text-white transition duration-200"
              >
                <FiShoppingCart size={20} />
                <span className="text-xs font-medium">Out Of Stock</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addToCart(elementData);
                  }
                  setQuantity(1);
                }}
                className="bg-primary-blue-darker rounded flex w-full justify-center items-center gap-2 px-2 py-2 text-white cursor-pointer hover:bg-primary-blue transition duration-200"
              >
                <FiShoppingCart size={20} />
                <span className="text-lg font-medium">Add to Cart</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Element from "@/components/Element";
import { ElementType, fetchElementsByCategory } from "@/services/elementsServices";

// Cores e estilos de fundo para cada categoria de elementos (usado no layout da página)
const categoryStyles: Record<string, { background: string; title: string; button: string }> = {
  "All Elements": {
    background: "bg-background-blue",
    title: "text-primary-blue",
    button: "bg-primary-blue text-white",
  },
  Metals: {
    background: "bg-yellow-100/50",
    title: "text-primary-yellow",
    button: "bg-primary-yellow text-white",
  },
  "Non-Metals": {
    background: "bg-green-100/50",
    title: "text-primary-green",
    button: "bg-primary-green text-white",
  },
  "Noble Gases": {
    background: "bg-background-purple",
    title: "text-secondary-purple",
    button: "bg-secondary-purple text-white",
  },
};

// Cores visuais para os cards de elementos (individuais)
const elementColors: Record<string, string> = {
  Metals: "yellow",
  "Non-Metals": "green",
  "Noble Gases": "purple",
  default: "blue", // fallback
};

export default function Elements() {
  const searchParams = useSearchParams(); // Hook do Next para acessar parâmetros da URL
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof categoryStyles>("All Elements");
  const [elements, setElements] = useState<ElementType[]>([]);
  // eslint-disable-next-line
  const [_loading, setLoading] = useState(true);
  // eslint-disable-next-line
  const [_error, setError] = useState<string | null>(null);

  // Quando a URL muda, atualiza a categoria ativa com base no parâmetro da query string
  useEffect(() => {
    const categoryFromParams = searchParams.get("category") as keyof typeof categoryStyles;
    if (categoryFromParams && categoryStyles[categoryFromParams]) {
      setSelectedCategory(categoryFromParams);
    }
  }, [searchParams]);

  // Busca os elementos da API conforme a categoria atual
  useEffect(() => {
    const loadElements = async () => {
      try {
        setLoading(true);
        const data = await fetchElementsByCategory(selectedCategory);
        setElements(data);
        setError(null);
        // eslint-disable-next-line
      } catch (err) {
        setError("Erro ao carregar elementos.");
      } finally {
        setLoading(false);
      }
    };

    loadElements();
  }, [selectedCategory]);

  // Troca manual de categoria (ao clicar nos botões)
  const handleCategoryChange = (category: keyof typeof categoryStyles) => {
    setSelectedCategory(category);
  };

  // Estilo visual para a categoria atual
  const styles = categoryStyles[selectedCategory];

  return (
    <div className={`${styles.background} w-screen min-h-screen text-black flex flex-col items-center pt-30 gap-4 pb-10`}>
      {/* Título da página */}
      <h1 className={`font-extrabold text-2xl sm:text-3xl lg:text-4xl ${styles.title} text-center`}>
        Chemical Elements Store
      </h1>

      {/* Descrição da página */}
      <p className="text-text-gray text-sm sm:text-base lg:text-lg w-11/12 sm:w-3/4 lg:w-1/2 text-center">
        Browse our collection of pure elements, each with its unique properties and applications.
      </p>

      {/* Botões de filtro de categorias */}
      <div className="flex flex-wrap justify-center mt-10 bg-white p-2 rounded-md border-2 border-border-gray gap-3 sm:gap-5 select-none">
        {Object.keys(categoryStyles).map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryChange(category as keyof typeof categoryStyles)}
            className={`px-4 py-2 rounded-md cursor-pointer text-sm sm:text-base transition-all duration-200 ${selectedCategory === category
              ? styles.button
              : "bg-white text-text-gray hover:bg-gray-100"
              }`}
          >
            {category}
          </div>
        ))}
      </div>

      {/* Lista de elementos químicos */}
      <div>
        <div className="grid gap-10 mt-14 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center">
          {elements.map((element) => (
            <Element
              image_url={element.image_url}
              key={element.atomic_number}
              id={element.id}
              stock={element.stock}
              atomic_number={element.atomic_number}
              atomic_mass={element.atomic_mass}
              symbol={element.symbol}
              name={element.name}
              description={element.description}
              category={element.category}
              state={element.state}
              price={element.price}
              color={
                elementColors[element.category.trim() as keyof typeof elementColors] ??
                elementColors.default
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

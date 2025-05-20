"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Element from "@/components/Element";
import { ElementType, fetchElementsByCategory } from "@/services/elementsServices";

// Mapeamento de cores por categoria (PARA A PAGINA, nao para os elementos)
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

// Mapeamento de cores para os elementos
const elementColors: Record<string, string> = {
    Metals: "yellow",
    "Non-Metals": "green",
    "Noble Gases": "purple",
    default: "blue", // Cor padrão para elementos sem categoria específica
};

export default function Elements() {
    const searchParams = useSearchParams(); // Hook para capturar os parâmetros da URL
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof categoryStyles>("All Elements"); // Estado para a categoria selecionada
    const [elements, setElements] = useState<ElementType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Atualiza a categoria com base no parâmetro da URL
    useEffect(() => {
        const categoryFromParams = searchParams.get("category") as keyof typeof categoryStyles;
        if (categoryFromParams && categoryStyles[categoryFromParams]) {
            setSelectedCategory(categoryFromParams);
        }
    }, [searchParams]);

    // Carrega elementos da API
    useEffect(() => {
        const loadElements = async () => {
        try {
            setLoading(true);
            const data = await fetchElementsByCategory(selectedCategory);
            setElements(data);
            setError(null);
        } catch (err) {
            setError("Erro ao carregar elementos.");
        } finally {
            setLoading(false);
        }
        };

        loadElements();
    }, [selectedCategory]);


    // Função para alterar a categoria selecionada
    const handleCategoryChange = (category: keyof typeof categoryStyles) => {
        setSelectedCategory(category);
    };

    // Obtém os estilos da categoria selecionada
    const styles = categoryStyles[selectedCategory];

    return (
        <div className={`${styles.background} w-screen min-h-screen text-black flex flex-col items-center pt-30 gap-4 pb-10`}>
            {/* Título */}
            <h1 className={`font-extrabold text-2xl sm:text-3xl lg:text-4xl ${styles.title} text-center`}>
                Chemical Elements Store
            </h1>
            <p className="text-text-gray text-sm sm:text-base lg:text-lg w-11/12 sm:w-3/4 lg:w-1/2 text-center">
                Browse our collection of pure elements, each with its unique properties and applications.
            </p>

            {/* Filtros */}
            <div className="flex flex-wrap justify-center mt-10 bg-white p-2 rounded-md border-2 border-border-gray gap-3 sm:gap-5 select-none">
                {Object.keys(categoryStyles).map((category) => (
                    <div
                        key={category}
                        onClick={() => handleCategoryChange(category as keyof typeof categoryStyles)} // Atualiza a categoria selecionada
                        className={`px-4 py-2 rounded-md cursor-pointer text-sm sm:text-base transition-all duration-200 ${
                            selectedCategory === category
                                ? styles.button
                                : "bg-white text-text-gray hover:bg-gray-100"
                        }`}
                    >
                        {category}
                    </div>
                ))}
            </div>

            {/* Lista de Elementos */}
            <div>
                <div className="flex flex-wrap gap-20 justify-center mt-20">
                    {elements.map((element) => (
                        <Element
                            id={element.id}
                            stock={element.stock}
                            key={element.atomic_number}
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
"use client";

import { useSearch } from "@/context/SearchContext";
import Element from "../../components/Element";
import { useEffect, useState } from "react";
import { fetchAllElements, ElementType } from "@/services/elementsServices";

// Componente que exibe os elementos químicos disponíveis
// Utilizado na página inicial para listar elementos com base no input de busca
export default function FeatureElements() {
    const { searchQuery } = useSearch(); // Obtém o termo de busca do contexto global

    const [elements, setElements] = useState<ElementType[]>([]); // Armazena os elementos carregados da API

    // Carrega os elementos ao montar o componente
    useEffect(() => {
        const loadElements = async () => {
            try {
                const data = await fetchAllElements(); // Busca todos os elementos do "backend"
                setElements(data); // Salva os dados no estado
            } catch (err) {
                console.error(err);
            }
        };

        loadElements();
    }, []);

    // Filtra os elementos de acordo com o que foi digitado no campo de busca
    const filteredElements = elements.filter(element =>
        element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        element.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        // Container principal da seção de destaque
        <div className="flex flex-col py-10 gap-10 px-20 items-center" id="FeaturedElementsSection">
            {/* Título da seção */}
            <h2 className="font-semibold text-2xl">Feature Elements</h2>

            {/* Grid responsiva com os elementos filtrados */}
            <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-center">
                {filteredElements.map(element => (
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
                        color="blue"
                    />
                ))}
            </div>
        </div>
    );
}

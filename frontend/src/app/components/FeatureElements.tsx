"use client"

import { useSearch } from "@/context/searchContext";
import Element from "./Element";
import elementsData from "@/data/elementsData.json"; // Importa os dados dos elementos

// Componente de elementos químicos
// Este componente exibe uma lista de elementos químicos com suas informações
// e um botão para adicionar ao carrinho. Ele é utilizado na página inicial do site
export default function FeatureElements() {
    const { searchQuery } = useSearch();

    const filteredElements = elementsData.filter(element =>
        element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        element.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className="flex flex-col py-10 gap-10 px-20 items-center" id="FeaturedElementsSection">
        <h2 className="font-semibold text-2xl">Feature Elements</h2>
        <div className="flex flex-wrap gap-20 justify-center"> 
            {filteredElements.map(element => (
            <Element
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
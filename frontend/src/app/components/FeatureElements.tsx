import Element from "./Element";

// Componente de elementos químicos
// Este componente exibe uma lista de elementos químicos com suas informações
// e um botão para adicionar ao carrinho. Ele é utilizado na página inicial do site
export default function FeatureElements() {

    // Modelo de dados para os elementos quimicos
    const elements = [
        {
            atomic_number: 1,
            symbol: "H",
            name: "Hydrogen",
            category: "Non-Metals",
            price: 0.02
        },
        {
            atomic_number: 2,
            symbol: "He",
            name: "Helium",
            category: "Noble Gases",
            price: 0.01
        },
        {
            atomic_number: 3,
            symbol: "Li",
            name: "Lithium",
            category: "Alkali Metals",
            price: 0.03
        },
        {
            atomic_number: 4,
            symbol: "Be",
            name: "Beryllium",
            category: "Alkaline Earth Metals",
            price: 0.05
        }
    ]

    return(
        <div className="flex flex-col py-10 gap-10 px-20 items-center">
            <h2 className="font-semibold text-2xl">Feature Elements</h2>
            <div className="flex flex-wrap gap-20 justify-center"> 
                {elements.map(element => (
                    <Element
                        key={element.atomic_number}
                        atomic_number={element.atomic_number}
                        symbol={element.symbol}
                        name={element.name}
                        category={element.category}
                        price={element.price}
                    />
                ))}
            </div>
        </div>

    )
}
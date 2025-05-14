import { FiShoppingCart } from "react-icons/fi";

interface ElementProps {
    atomic_number: number;
    symbol: string; 
    name: string;
    category: string;
    price: number;
}

// Componente de elemento
// Este componente exibe as informações
// de um elemento químico, incluindo seu número atômico, para comprar
export default function Element(props: ElementProps) {
    return (
        <div className="w-60 rounded-xl border border-border-gray cursor-pointer hover:shadow-lg transition duration-200">
            <div className="bg-gray-200 h-60 w-full rounded-t-xl relative select-none">
                <div className="px-2 bg-primary-blue w-fit rounded-xl text-white text-sm absolute right-2 top-2">{props.symbol}</div>
            </div>
            <div className="px-4 py-2">
                <h2 className="font-medium text-lg">{props.name}</h2>
                <p className="text-text-gray text-sm">Atomic Number: {props.atomic_number}</p>
                <p className="text-text-gray text-sm">{props.category}</p>
                
                <div className="flex items-center justify-between mt-2">
                    <p className="text-primary-blue font-medium text-sm">Price: ${props.price}</p>
                    <button className="bg-primary-blue-darker rounded flex items-center gap-2 px-2 py-2 text-white cursor-pointer hover:bg-primary-blue transition duration-200">
                        <FiShoppingCart size={20} />
                        <span className="text-xs font-medium">Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
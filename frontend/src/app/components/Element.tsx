import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { ElementProps } from "@/types/Elements";

// Mapeamento de cores predefinidas
const colorPresets: Record<string, { background: string; text: string; button: string; buttonHover: string }> = {
    purple: {
        background: "bg-purple-100",
        text: "text-primary-purple",
        button: "bg-secondary-purple",
        buttonHover: "hover:bg-primary-purple",
    },
    blue: {
        background: "bg-gray-200",
        text: "text-primary-blue",
        button: "bg-primary-blue",
        buttonHover: "hover:bg-secondary-blue",
    },
    green: {
        background: "bg-green-100",
        text: "text-green-700",
        button: "bg-green-700",
        buttonHover: "hover:bg-green-800",
    },
    yellow: {
        background: "bg-yellow-100",
        text: "text-primary-yellow",
        button: "bg-primary-yellow",
        buttonHover: "hover:bg-yellow-600",
    },
    // Adicione mais cores conforme necessário
};

export default function Element(props: ElementProps & { color: keyof typeof colorPresets }) {
    // Obtém as classes de cores predefinidas com base no parâmetro `color`
    const colors = colorPresets[props.color] || colorPresets.purple; // Default para "purple"

    return (
        <Link href={`/Products/${props.name}`}>
            <div className={`w-60 rounded-xl border border-border-gray cursor-pointer hover:shadow-lg transition duration-200`}>
                <div
                    className={`h-60 w-full rounded-t-xl relative select-none ${colors.background}`} // Cor de fundo predefinida
                >
                    <div className={`px-2 w-fit rounded-xl text-white text-sm absolute right-2 top-2 ${colors.button}`}>
                        {props.symbol}
                    </div>
                </div>
                <div className="px-4 py-2 bg-white">
                    <h2 className={`font-medium text-lg text-black`}>
                        {props.name}
                    </h2>
                    <p className={`text-sm text-text-gray`}>
                        Atomic Number: {props.atomic_number}
                    </p>
                    <p className={`text-sm text-text-gray`}>
                        {props.category}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                        <p className={`font-medium text-sm ${colors.text}`}>
                            Price: ${props.price}
                        </p>
                        <button
                            className={`rounded flex items-center gap-2 px-2 py-2 text-white cursor-pointer transition duration-200 ${colors.button} ${colors.buttonHover}`}
                        >
                            <FiShoppingCart size={20} />
                            <span className="text-xs font-medium">Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
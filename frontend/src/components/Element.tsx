import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { ElementType } from "@/services/elementsServices";

// Cores predefinidas para diferentes categorias visuais (como "blue", "purple", etc.)
const colorPresets: Record<string, {
  background: string;
  text: string;
  button: string;
  buttonHover: string;
}> = {
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
};

// Componente que representa visualmente um "elemento químico" na listagem
export default function Element(props: ElementType & { color: keyof typeof colorPresets }) {
  // Determina as classes de estilo baseadas na cor definida
  const colors = colorPresets[props.color] || colorPresets.purple;

  // Hook de contexto que fornece a função para adicionar ao carrinho
  const { addToCart } = useCart();

  return (
    // Redireciona para a página individual do produto ao clicar no card
    <Link href={`/Products/${props.name}`}>
      <div className={`w-60 rounded-xl border border-border-gray cursor-pointer hover:shadow-lg transition duration-200`}>
        
        {/* Área visual superior do elemento (Imagem) */}
        <div className={`h-60 w-full rounded-t-xl relative select-none ${colors.background}`}>
          {/* Exibe a imagem do elemento, ou um fundo padrão caso não haja imagem */}
          {props.image_url ? (
            <img
              src={props.image_url}
              alt={props.name}
              className="w-full h-full object-cover rounded-t-xl"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500">
              No Image Available
            </div>
          )}

          {/* Exibe o símbolo do elemento no topo direito */}
          <div className={`px-2 w-fit rounded-xl text-white text-sm absolute right-2 top-2 ${colors.button}`}>
            {props.symbol}
          </div>
        </div>

        {/* Informações e botão de ação */}
        <div className="px-4 py-2 bg-white relative">
          <h2 className={`font-medium text-lg text-black`}>{props.name}</h2>
          <p className="text-sm text-text-gray">Atomic Number: {props.atomic_number}</p>
          <p className="text-sm text-text-gray">{props.category}</p>

          {/* Quantidade em estoque */}
          <p className="text-xs absolute -top-6 right-4 text-text-gray font-semibold">
            {props.stock} in stock
          </p>

          {/* Área inferior com preço e botão de ação */}
          <div className="flex items-center justify-between mt-2">
            <p className={`font-medium text-sm ${colors.text}`}>
              Price: ${props.price}
            </p>

            {/* Botão muda caso o estoque seja 0 */}
            {props.stock === 0 ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="rounded flex items-center gap-2 px-2 py-2 text-white bg-primary-gray cursor-not-allowed"
              >
                <FiShoppingCart size={20} />
                <span className="text-xs font-medium">Out Of Stock</span>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  addToCart(props); // Adiciona ao carrinho
                  e.preventDefault(); // Evita redirecionamento
                  e.stopPropagation(); // Evita que o clique ative o <Link>
                }}
                className={`rounded cursor-pointer flex items-center gap-2 px-2 py-2 text-white ${colors.button} ${colors.buttonHover}`}
              >
                <FiShoppingCart size={20} />
                <span className="text-xs font-medium">Add to Cart</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
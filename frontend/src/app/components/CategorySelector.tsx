import Link from "next/link";
import { AiFillGolden } from "react-icons/ai";
import { BiAtom, BiWater } from "react-icons/bi";

// Componente de seleção de categorias
// Este componente exibe uma lista de categorias de elementos químicos
// com ícones e descrições. Ele é utilizado na página inicial do site
// para ajudar os usuários a navegar pelas diferentes categorias de elementos.
export default function CategorySelector() {
    return (
        <div className="bg-background-light flex flex-col items-center py-10">
            <h2 className="font-semibold text-2xl">Browse by Category</h2>

            <div className="flex flex-wrap justify-center gap-10 mt-10">
                {/* Metais */}
                <Link href="/Elements?category=Metals">
                    <div className="flex flex-col bg-white border-1 rounded-lg border-border-gray px-6 py-5 gap-4 select-none cursor-pointer hover:bg-white/40 transition-all duration-200 w-96">
                        <div className="w-12 h-12 rounded-md bg-primary-yellow flex items-center justify-center">
                            <AiFillGolden size={30} color="white" />
                        </div>
                        <h3 className="font-semibold text-lg">Metals</h3>
                        <p className="font-medium text-text-gray-darker text-left">
                            Conductive elements with metallic properties
                        </p>
                    </div>
                </Link>

                {/* Não metais */}
                <Link href="/Elements?category=Non-Metals">
                    <div className="flex flex-col bg-white border-1 rounded-lg border-border-gray px-6 py-5 gap-4 select-none cursor-pointer hover:bg-white/40 transition-all duration-200 w-96">
                        <div className="w-12 h-12 rounded-md bg-primary-green flex items-center justify-center">
                            <BiAtom size={30} color="white" />
                        </div>
                        <h3 className="font-semibold text-lg">Non-Metals</h3>
                        <p className="font-medium text-text-gray-darker text-left">
                            Essential elements for organic chemistry
                        </p>
                    </div>
                </Link>

                {/* Gases */}
                <Link href="/Elements?category=Noble Gases">
                    <div className="flex flex-col bg-white border-1 rounded-lg border-border-gray px-6 py-5 gap-4 select-none cursor-pointer hover:bg-white/40 transition-all duration-200 w-96">
                        <div className="w-12 h-12 rounded-md bg-primary-purple flex items-center justify-center">
                            <BiWater size={30} color="white" />
                        </div>
                        <h3 className="font-semibold text-lg">Gases</h3>
                        <p className="font-medium text-text-gray-darker text-left">
                            Gaseous elements with unique properties
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
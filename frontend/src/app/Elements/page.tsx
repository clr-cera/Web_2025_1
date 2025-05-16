import Element from "../components/Element";
import elementsData from "@/data/elementsData.json"; // Importa os dados dos elementos


export default function Elements(){
    return(
        <div className="bg-background-purple w-screen h-screen text-black flex flex-col items-center pt-30 gap-4">

            {/* Título */}
            <h1 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-secondary-purple text-center">
                Chemical Elements Store
            </h1>
            <p className="text-text-gray text-sm sm:text-base lg:text-lg w-11/12 sm:w-3/4 lg:w-1/2 text-center">
                Browse our collection of pure elements, each with its unique properties and applications.
            </p>

            {/* Filtros */}
            <div className="flex flex-wrap justify-center mt-10 bg-white p-2 rounded-md border-2 border-border-gray gap-3 sm:gap-5 select-none">
                <div className="bg-secondary-purple text-white px-4 py-2 rounded-md cursor-pointer text-sm sm:text-base">
                    All Elements
                </div>
                <div className="bg-white px-4 py-2 rounded-md cursor-pointer text-sm sm:text-base  hover:bg-gray-100">
                    Metals
                </div>
                <div className="bg-white px-4 py-2 rounded-md cursor-pointer text-sm sm:text-base  hover:bg-gray-100">
                    Non-metals
                </div>
                <div className="bg-white px-4 py-2 rounded-md cursor-pointer text-sm sm:text-base  hover:bg-gray-100">
                    Noble Gases
                </div>
            </div>

            <div>
                <div className="flex flex-wrap gap-20 justify-center mt-20"> 
                {elementsData.map(element => (
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
                        color="purple"
                    />
                ))}
            </div>
            </div>

        </div>
    )
}
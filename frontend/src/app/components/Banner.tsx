export default function Banner() {
    // Função para rolar suavemente até a seção "Featured Elements"
    const scrollToElements = () => {
        const elementsSection = document.getElementById("FeaturedElementsSection");
        if (elementsSection) {
            elementsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="flex w-full bg-primary-blue items-center flex-col pb-20 gap-10 pt-40">
            {/* Título principal do banner */}
            <h1 className="font-bold text-white text-3xl sm:text-5xl">
                Pure Elements, Pure Science
            </h1>

            {/* Subtítulo */}
            <p className="text-white font-medium text-lg">
                Discover our premium collection of periodic elements
            </p>

            <div className="flex justify-center gap-10">
                {/* Botão que rola até a seção de elementos em destaque */}
                <button
                    onClick={scrollToElements}
                    className="bg-white rounded-4xl font-semibold text-primary-blue px-6 py-2 cursor-pointer hover:bg-gray-200"
                >
                    Shop Elements
                </button>

                {/* Link para a página "About" */}
                <a
                    href="/About"
                    className="bg-primary-blue border font-semibold rounded-4xl px-6 py-2 border-white text-white cursor-pointer hover:bg-secondary-blue"
                >
                    Learn More
                </a>
            </div>
        </div>
    );
}

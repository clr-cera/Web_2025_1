import { AiOutlineUser } from "react-icons/ai";
import { SlChemistry } from "react-icons/sl";

// Página "About"
// Explica o que é o ElementStore
export default function AboutPage() {
  return (
    <div className="bg-background-blue w-screen h-screen text-black flex flex-col items-center pt-30 gap-4">
      {/* Título principal da página */}
      <h1 className="font-extrabold text-2xl sm:text-4xl lg:text-4xl text-secondary-blue text-center">
        Chemical Elements Store
      </h1>

      {/* Cards informativos */}
      <div className="flex flex-wrap justify-center gap-20 mt-20">
        {/* Card 1 - Sobre o ElementStore */}
        <div className="flex flex-col bg-white border-1 rounded-lg border-border-gray px-6 py-5 gap-4 select-none cursor-pointer hover:bg-white/40 transition-all duration-200 w-96">
          <div className="w-12 h-12 rounded-md bg-primary-blue flex items-center justify-center">
            <SlChemistry size={30} className="text-white" />
          </div>
          <h3 className="font-semibold text-lg">What is ElementStore?</h3>
          <p className="font-medium text-text-gray-darker text-left">
            Element Store is the perfect place to buy all needed chemical elements for your experiments and projects.
            With the best prices and a wide variety of elements, you can find everything you need in one place.
          </p>
        </div>

        {/* Card 2 - Sobre a equipe/usuário */}
        <div className="flex flex-col bg-white border-1 rounded-lg border-border-gray px-6 py-5 gap-4 select-none cursor-pointer hover:bg-white/40 transition-all duration-200 w-96">
          <div className="w-12 h-12 rounded-md bg-primary-blue flex items-center justify-center">
            <AiOutlineUser size={30} className="text-white" />
          </div>
          <h3 className="font-semibold text-lg">Who is behind?</h3>
          <p className="font-medium text-text-gray-darker text-left">
            Behind ElementStore is a team of passionate chemists and developers who wanted to create a platform to make chemical elements more accessible to everyone.
            We promote science and education, providing a secure user-friendly experience for all users.
          </p>
        </div>
      </div>
    </div>
  );
}

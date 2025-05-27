"use client" // Indica que este componente será executado no cliente (necessário para hooks e interatividade)

// Importa os componentes usados na página inicial
import Banner from "@/app/components/Banner";
import CategorySelector from "@/app/components/CategorySelector";
import FeatureElements from "@/app/components/FeatureElements";

// Página principal ("/")
export default function Home() {
  return (
    <div className="text-black">
      {/* Banner introdutório */}
      <Banner />

      {/* Seletor de categorias (ex: gases, metais etc) */}
      <CategorySelector />

      {/* Lista de elementos*/}
      <FeatureElements />
    </div>
  );
}

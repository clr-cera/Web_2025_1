"use client";
// PAGINA ESPECIFICA

import { useEffect, useState } from "react";
import { ElementType, fetchAllElements } from "@/services/elementsServices";
import ElementBlock from "@/app/Table/components/ElementBlock";

// Filtros disponíveis para exibição por categoria
const filters = ["All Elements", "Metals", "Non-metals", "Noble Gases"];

// Dimensões da tabela periódica (linhas e colunas)
const rows = 7;
const cols = 18;

export default function PeriodicTablePage() {
  const [elements, setElements] = useState<ElementType[]>([]);
  const [filter, setFilter] = useState("All Elements");

  // Carrega todos os elementos da API ao montar o componente
  useEffect(() => {
    const load = async () => {
      const data = await fetchAllElements();
      setElements(data);
    };
    load();
  }, []);

  // Função que determina se um elemento corresponde ao filtro atual
  const isMatch = (element: ElementType) => {
    const cat = element.category.toLowerCase();

    if (filter === "All Elements") return true;
    if (filter === "Metals") return cat === "metals";
    if (filter === "Non-metals") return cat === "non-metals";
    if (filter === "Noble Gases") return cat === "noble gases";
    return true;
  };

  // Monta a grade da tabela com base na linha e coluna de cada elemento
  const grid: (ElementType | null)[][] = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(null));

  elements.forEach((el) => {
    const row = el["row"];
    const col = el["column"];
    if (row && col) grid[row - 1][col - 1] = el;
  });

  return (
    <div className="px-4 sm:px-10 pb-10 pt-30 bg-background-blue min-h-screen">
      {/* Cabeçalho da página */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary-blue">Periodic Table of Elements</h1>
        <p className="text-text-gray mt-2">
          Explore our interactive periodic table. Click on any element see more.
        </p>
      </div>

      {/* Container da tabela */}
      <div className="bg-white py-5 rounded-lg">
        
        {/* Botões de filtro por categoria */}
        <div className="flex justify-center mb-8 gap-2 flex-wrap">
          {filters.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1 text-sm rounded-md font-semibold transition cursor-pointer ${
                filter === cat
                  ? "bg-primary-blue text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grade da Tabela Periódica */}
        <div className="overflow-x-auto py-4 px-2">
          <div className="w-[100rem] mx-auto">
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${cols}, 85px)`, // Define número e largura das colunas
              }}
            >
              {grid.flat().map((element, index) => (
                <div key={index} className="w-full h-full">
                  {element && isMatch(element) ? (
                    <ElementBlock element={element} />
                  ) : (
                    <div className="min-h-15" /> // espaço vazio
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legenda de cores */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <LegendItem color="bg-green-100" label="Nonmetal" />
          <LegendItem color="bg-blue-100" label="Metal" />
          <LegendItem color="bg-purple-100" label="Noble Gas" />
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para a legenda da tabela
function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-4 h-4 rounded-sm ${color}`} />
      <p>{label}</p>
    </div>
  );
}

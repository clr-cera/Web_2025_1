"use client";

import { useEffect, useState } from "react";
import { ElementType, fetchAllElements } from "@/services/elementsServices";
import ElementBlock from "@/app/Table/components/ElementBlock";

const filters = ["All Elements", "Metals", "Non-metals", "Noble Gases"];


const rows = 7;
const cols = 18;

export default function PeriodicTablePage() {
  const [elements, setElements] = useState<ElementType[]>([]);
  const [filter, setFilter] = useState("All Elements");

  useEffect(() => {
    const load = async () => {
      const data = await fetchAllElements();
      setElements(data);
    };
    load();
  }, []);

  const isMatch = (element: ElementType) => {
    const cat = element.category.toLowerCase();

    if (filter === "All Elements") return true;
    if (filter === "Metals") return cat === "metals";
    if (filter === "Non-metals") return cat === "non-metals";
    if (filter === "Noble Gases") return cat === "noble gases";
    return true;
  };

  // Montagem da grade com base nas posições
  const grid: (ElementType | null)[][] = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(null));
  elements.forEach((el) => {
    const row = el["row"];
    const col = el["column"];
    if (row && col) grid[row - 1][col - 1] = el;
  });

  return (
    <div className="px-4 sm:px-10 pb-10 pt-30  bg-background-blue min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary-blue">Periodic Table of Elements</h1>
        <p className="text-text-gray mt-2">
          Explore our interactive periodic table. Click on any element see more.
        </p>
      </div>
      <div className="bg-white py-5 rounded-lg">
          {/* Filtros */}
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

          {/* Container da Tabela */}
        <div className="overflow-x-auto py-4 px-2">
          <div className="w-[100rem] mx-auto"> {/* Considera o tamanho para as colunas*/}
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${cols}, 85px)` // Cada coluna = 64px
              }}
            >
              {grid.flat().map((element, index) => (
                <div key={index} className="w-full h-full">
                  {element && isMatch(element) ? (
                    <ElementBlock element={element} />
                  ) : (
                    <div className="min-h-15" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

          {/* Legenda */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <LegendItem color="bg-green-100" label="Nonmetal" />
            <LegendItem color="bg-blue-100" label="Metal" />
            <LegendItem color="bg-purple-100" label="Noble Gas" />
          </div>
        </div>
      </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-4 h-4 rounded-sm ${color}`} />
      <p>{label}</p>
    </div>
  );
}

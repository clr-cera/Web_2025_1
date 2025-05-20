"use client";

import Link from "next/link";
import { ElementType } from "@/services/elementsServices";

// Mapeia cores de fundo, borda e texto por categoria
const categoryStyles: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  "Non-Metals": {
    bg: "bg-green-100",
    border: "border-green-400",
    text: "text-green-800",
  },
  "Metals": {
    bg: "bg-blue-100",
    border: "border-blue-400",
    text: "text-blue-800",
  },
  "Noble Gases": {
    bg: "bg-purple-100",
    border: "border-purple-400",
    text: "text-purple-800",
  },
};

export default function ElementBlock({ element }: { element: ElementType }) {
  const style = categoryStyles[element.category] || {
    bg: "bg-gray-100",
    border: "border-gray-300",
    text: "text-gray-700",
  };

  return (
    <Link
      href={`/Products/${element.name}`}
      className={`
        ${style.bg} ${style.border} ${style.text}
        w-16 h-20 sm:w-20 sm:h-24
        rounded-lg shadow-sm border
        flex flex-col items-center justify-between
        px-2 py-2 text-center
        transition-transform transform hover:scale-105 hover:shadow-md
      `}
    >
      <div className="text-[10px] sm:text-xs font-medium">
        {element.atomic_number}
      </div>
      <div className="text-base sm:text-lg font-bold">{element.symbol}</div>
      <div className="text-[10px] sm:text-xs truncate">{element.name}</div>
    </Link>
  );
}

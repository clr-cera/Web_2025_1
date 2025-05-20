// src/components/ui/Modal.tsx
"use client"; // Indica que este componente será renderizado no cliente (necessário para interatividade)

import React from "react";
import { IoMdClose } from "react-icons/io"; // Ícone de fechar o modal

// Tipagem das props aceitas pelo componente Modal
interface ModalProps {
  isOpen: boolean;               // Define se o modal está visível
  onClose: () => void;           // Função chamada ao fechar o modal
  title?: string;                // Título do modal
  children: React.ReactNode;     // Conteúdo passado para dentro do modal
  widthClass?: string;           // Classe opcional para largura personalizada
}

// Componente de Modal reutilizável
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title = "Modal",
  children,
  widthClass = "w-full sm:w-[500px]"
}) => {
  // Se não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  return (
    // Fundo escurecido cobrindo toda a tela
    <div className="fixed inset-0 bg-black/60 bg-opacity-40 z-50 flex items-center justify-center px-4">
      {/* Caixa branca do modal */}
      <div
        className={`bg-white rounded-lg shadow-lg relative p-6 ${widthClass} max-h-[90vh] overflow-y-auto`}
      >
        {/* Cabeçalho do modal com título e botão de fechar */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black cursor-pointer">
            <IoMdClose size={22} />
          </button>
        </div>

        {/* Conteúdo passado para dentro do modal */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

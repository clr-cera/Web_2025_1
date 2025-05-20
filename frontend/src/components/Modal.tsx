// src/components/ui/Modal.tsx
"use client";

import React from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  widthClass?: string; // ex: "w-full sm:w-[500px]"
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title = "Modal",
  children,
  widthClass = "w-full sm:w-[500px]"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-40 z-50 flex items-center justify-center px-4">
      <div
        className={`bg-white rounded-lg shadow-lg relative p-6 ${widthClass} max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black cursor-pointer">
            <IoMdClose size={22} />
          </button>
        </div>

        {/* Conteudo */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

// Componente responsável por exibir a tabela de produtos (elementos químicos)
// Permite: busca, criação, edição e exclusão de produtos via modais

"use client";

import React, { useState } from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { FaRegTrashCan } from 'react-icons/fa6';
import Modal from '@/components/Modal';
import { ElementType, createElement, updateElement, deleteElement } from '@/services/elementsServices';
import toast from 'react-hot-toast';

interface ProductsTableProps {
  data?: ElementType[];
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ data = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ElementType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Filtro de produtos com base no nome
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-white shadow rounded p-4 mt-5">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <BsBoxSeam size={25} />
          <h2 className="ml-2 text-2xl font-semibold">Products</h2>
        </div>
        <button
          className="bg-primary-blue hover:bg-secondary-blue text-white font-medium px-4 py-2 rounded cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Add Product
        </button>
      </div>

      {/* Barra de pesquisa */}
      <input
        type="text"
        placeholder="Search Products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 border border-border-gray rounded mb-4"
      />

      {/* Tabela de produtos */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-border-gray">
          <thead>
            <tr className="bg-secondary-gray text-left text-text-gray text-sm">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Stock</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.atomic_number} className="border-t border-border-gray">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4 font-medium">${item.price}</td>
                <td className="py-2 px-4">{item.stock}</td>
                <td className="py-2 px-4 space-x-2">
                  {/* Editar */}
                  <button
                    className="text-black cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(item);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <MdEdit size={20} />
                  </button>

                  {/* Deletar */}
                  <button
                    className="text-red-600 cursor-pointer"
                    onClick={async () => {
                      if (confirm("Tem certeza que deseja deletar este produto?")) {
                        try {
                          await deleteElement(item.id);
                          location.reload(); // Atualize via estado se possível
                        } catch (err) {
                          console.error("Erro ao deletar produto:", err);
                        }
                      }
                    }}
                  >
                    <FaRegTrashCan size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {/* Caso nenhum produto seja encontrado */}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-text-gray">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de criação */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Product"
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);

            // Validação de row e column
            const row = Number(formData.get("row"));
            const column = Number(formData.get("column"));
            if (row < 1 || row > 9) {
              toast.error("Row must be between 1 and 9.");
              return;
            }
            if (column < 1 || column > 18) {
              toast.error("Column must be between 1 and 18.");
              return;
            }

            // Extraindo e convertendo os dados
            const atomic_number = Number(formData.get("atomic_number"));
            const atomic_mass = Number(formData.get("atomic_mass"));
            const price = Number(formData.get("price"));
            const stock = Number(formData.get("stock"));
            const symbol = formData.get("symbol") as string;
            const name = formData.get("name") as string;
            const state = formData.get("state") as string;
            const image_url = formData.get("image_url") as string; // URL da imagem

            // Validações extras para evitar valores absurdos
            if (atomic_number < 1 || atomic_number > 118) {
              toast.error("Atomic Number must be between 1 and 118.");
              return;
            }
            if (atomic_mass <= 0 || atomic_mass > 300) {
              toast.error("Atomic Mass must be a positive number and under 300.");
              return;
            }
            if (!symbol || symbol.trim().length === 0 || symbol.length > 3) {
              toast.error("Please provide a valid chemical symbol (1-3 characters).");
              return;
            }
            if (!name || name.trim().length === 0 || name.length > 12) {
              toast.error("Please provide a valid name (1-12 characters).");
              return;
            }
            if (price <= 0 || price > 100000) {
              toast.error("Price must be greater than 0 and less than 100,000.");
              return;
            }
            if (stock < 0 || stock > 1000000) {
              toast.error("Stock must be between 0 and 1,000,000.");
              return;
            }
            if (!state || state.trim().length === 0 || !["Solid", "Liquid", "Gas"].includes(state)) {
              toast.error("Please provide a valid state (e.g. Solid, Liquid, Gas).");
              return;
            }

            try {
              const newProduct = {
                atomic_number,
                atomic_mass,
                symbol,
                name,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                state: formData.get("state") as string,
                price,
                stock,
                row,
                column,
                image_url, // Adiciona a URL da imagem
              };

              await createElement(newProduct);
              setIsModalOpen(false);
              location.reload();
            } catch (err) {
              console.error("Erro ao criar produto:", err);
            }
          }}
          className="flex flex-col gap-4 mt-2"
        >
          {/* Campos do formulário de criação */}
          {[
            { name: "atomic_number", label: "Atomic Number", type: "number", placeholder: "e.g. 31" },
            { name: "atomic_mass", label: "Atomic Mass", type: "number", step: "0.001", placeholder: "e.g. 69.723" },
            { name: "symbol", label: "Symbol", type: "text", placeholder: "e.g. Ga" },
            { name: "name", label: "Name", type: "text", placeholder: "e.g. Gallium" },
            { name: "description", label: "Description", type: "textarea", placeholder: "Gallium is a soft metal..." },
            { name: "state", label: "State", type: "text", placeholder: "e.g. Solid" },
            { name: "price", label: "Price ($)", type: "number", step: "0.01", placeholder: "e.g. 0.05" },
            { name: "stock", label: "Stock", type: "number", placeholder: "e.g. 100" },
            { name: "image_url", label: "Image URL", type: "text", placeholder: "e.g. https://example.com/image.jpg" }, // Campo para URL da imagem
          ].map(({ name, label, type, ...rest }) => (
            <div key={name} className="flex flex-col gap-1">
              <label className="text-text-gray-darker">{label}</label>
              {type === "textarea" ? (
                <textarea name={name} {...rest} rows={3} className="border px-3 py-2 rounded border-border-gray resize-none" />
              ) : (
                <input name={name} type={type} {...rest} className="border px-3 py-2 rounded border-border-gray" />
              )}
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <label className="text-text-gray-darker">Category</label>
            <select
              name="category"
              className="border px-3 py-2 rounded border-border-gray text-text-gray"
              defaultValue=""
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Metals">Metals</option>
              <option value="Non-Metals">Non-Metals</option>
              <option value="Noble Gases">Noble Gases</option>
            </select>
          </div>
          {/* Linha e coluna */}
          <div className="flex gap-4">
            {["row", "column"].map((field) => (
              <div key={field} className="flex flex-col gap-1 w-1/2">
                <label className="text-text-gray-darker">
                  {field[0].toUpperCase() + field.slice(1)}
                </label>
                <input name={field} type="number" placeholder={`e.g. ${field === "row" ? 3 : 13}`} className="border px-3 py-2 rounded border-border-gray" />
              </div>
            ))}
          </div>
          <button type="submit" className="bg-primary-blue hover:bg-secondary-blue text-white font-semibold px-4 py-2 rounded mt-2 cursor-pointer">
            Create
          </button>
        </form>
      </Modal>

      {/* Modal de edição */}
      {selectedProduct && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedProduct(null);
          }}
          title={`Edit Product: ${selectedProduct.name}`}
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!selectedProduct) return;

              const formData = new FormData(e.currentTarget);

              // Validação de row e column
              const row = Number(formData.get("row"));
              const column = Number(formData.get("column"));
              if (row < 1 || row > 9) {
                toast.error("Row must be between 1 and 9.");
                return;
              }
              if (column < 1 || column > 18) {
                toast.error("Column must be between 1 and 18.");
                return;
              }

              // Extraindo e convertendo os dados para edição
              const atomic_number = Number(formData.get("atomic_number"));
              const atomic_mass = Number(formData.get("atomic_mass"));
              const price = Number(formData.get("price"));
              const stock = Number(formData.get("stock"));
              const symbol = formData.get("symbol") as string;
              const name = formData.get("name") as string;
              const state = formData.get("state") as string;
              const image_url = formData.get("image_url") as string; // URL da imagem

              // Validações extras para evitar valores absurdos
              if (atomic_number < 1 || atomic_number > 118) {
                toast.error("Atomic Number must be between 1 and 118.");
                return;
              }
              if (atomic_mass <= 0 || atomic_mass > 300) {
                toast.error("Atomic Mass must be a positive number and under 300.");
                return;
              }
              if (!symbol || symbol.trim().length === 0 || symbol.length > 3) {
                toast.error("Please provide a valid chemical symbol (1-3 characters).");
                return;
              }
              if (!name || name.trim().length === 0 || name.length > 12) {
                toast.error("Please provide a valid name (1-12 characters).");
                return;
              }
              if (price <= 0 || price > 100000) {
                toast.error("Price must be greater than 0 and less than 100,000.");
                return;
              }
              if (stock < 0 || stock > 1000000) {
                toast.error("Stock must be between 0 and 1,000,000.");
                return;
              }
              if (!state || state.trim().length === 0 || !["Solid", "Liquid", "Gas"].includes(state)) {
                toast.error("Please provide a valid state (e.g. Solid, Liquid, Gas).");
                return;
              }

              try {
                const updatedProduct = {
                  name: formData.get("name") as string,
                  price,
                  stock,
                  atomic_number,
                  atomic_mass,
                  symbol,
                  description: formData.get("description") as string,
                  category: formData.get("category") as string,
                  state: formData.get("state") as string,
                  row,
                  column,
                  image_url, // Adiciona a URL da imagem
                };

                await updateElement(selectedProduct.id, updatedProduct);
                setIsEditModalOpen(false);
                setSelectedProduct(null);
                location.reload();
              } catch (err) {
                console.error("Erro ao atualizar produto:", err);
              }
            }}
            className="flex flex-col gap-4 mt-2"
          >
            {/* Campos de edição (mesma estrutura do cadastro, com defaultValue) */}
            {[
              { name: "atomic_number", label: "Atomic Number", readOnly: true, defaultValue: selectedProduct.atomic_number },
              { name: "name", label: "Name", defaultValue: selectedProduct.name },
              { name: "price", label: "Price", type: "number", step: "0.01", defaultValue: selectedProduct.price },
              { name: "stock", label: "Stock", type: "number", defaultValue: selectedProduct.stock },
              { name: "atomic_mass", label: "Atomic Mass", type: "number", step: "0.001", defaultValue: selectedProduct.atomic_mass },
              { name: "symbol", label: "Symbol", defaultValue: selectedProduct.symbol },
              { name: "description", label: "Description", type: "textarea", defaultValue: selectedProduct.description },
              { name: "state", label: "State", defaultValue: selectedProduct.state },
              { name: "image_url", label: "Image URL", type: "text", defaultValue: selectedProduct.image_url }, // Campo para URL da imagem
            ].map(({ name, label, type = "text", readOnly = false, step, defaultValue }) => (
              <div key={name} className="flex flex-col gap-1">
                <label className="text-text-gray-darker">{label}</label>
                {type === "textarea" ? (
                  <textarea
                    name={name}
                    defaultValue={defaultValue}
                    className="border px-3 py-2 rounded border-border-gray resize-none"
                    rows={3}
                  />
                ) : (
                  <input
                    name={name}
                    type={type}
                    defaultValue={defaultValue}
                    className="border px-3 py-2 rounded border-border-gray"
                    readOnly={readOnly}
                    step={step}
                  />
                )}
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <label className="text-text-gray-darker">Category</label>
              <select
                name="category"
                className="border px-3 py-2 rounded border-border-gray"
                defaultValue={selectedProduct?.category || ""}
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Metals">Metals</option>
                <option value="Non-Metals">Non-metals</option>
                <option value="Noble Gases">Noble Gases</option>
              </select>
            </div>
            {/* Row/Column */}
            <div className="flex gap-4">
              {["row", "column"].map((field) => (
                <div key={field} className="flex flex-col gap-1 w-1/2">
                  <label className="text-text-gray-darker">
                    {field[0].toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    name={field}
                    type="number"
                    // eslint-disable-next-line
                    defaultValue={(selectedProduct as any)[field]}
                    className="border px-3 py-2 rounded border-border-gray"
                  />
                </div>
              ))}
            </div>
            <button type="submit" className="bg-primary-blue hover:bg-secondary-blue text-white font-semibold px-4 py-2 rounded mt-2 cursor-pointer">
              Save Changes
            </button>
          </form>
        </Modal>
      )}
    </section>
  );
};

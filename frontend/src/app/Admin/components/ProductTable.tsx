// src/components/ProductsTable.tsx
"use client";

import React, { useState } from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { FaRegTrashCan } from 'react-icons/fa6';
import Modal from '@/components/Modal'; // ajuste o caminho se necessário
import { ElementType } from '@/services/elementsServices';
import { createElement, updateElement, deleteElement } from '@/services/elementsServices';


interface ProductsTableProps {
  data?: ElementType[];
}
 
export const ProductsTable: React.FC<ProductsTableProps> = ({ data = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<ElementType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-white shadow rounded p-4 mt-5">
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



      <input
        type="text"
        placeholder="Search Products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 border border-border-gray rounded mb-4"
      />

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
                  <button 
                    className="text-black cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(item);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <MdEdit size={20} />
                  </button>
                  <button 
                    className="text-red-600 cursor-pointer"
                    onClick={async () => {
                      if (confirm("Tem certeza que deseja deletar este produto?")) {
                        try {
                          await deleteElement(item.id);
                          location.reload(); // ou atualize via state
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


      {/* Modal de cadastro */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Product"
      >
        <p className="font-semibold text-text-gray mb-10">Fill in the details for the new product.</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            try {
              const newProduct = {
                atomic_number: Number(formData.get("atomic_number")),
                atomic_mass: Number(formData.get("atomic_mass")),
                symbol: formData.get("symbol") as string,
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                state: formData.get("state") as string,
                price: Number(formData.get("price")),
                stock: Number(formData.get("stock")),
                row: Number(formData.get("row")),
                column: Number(formData.get("column")),
              };

              await createElement(newProduct);
              setIsModalOpen(false);
              location.reload(); // ou use refetch
            } catch (err) {
              console.error("Erro ao criar produto:", err);
            }
          }}
          className="flex flex-col gap-4 mt-2"
        >
          <div className="flex flex-col gap-1">
            <label className="text-text-gray-darker">Atomic Number</label>
            <input
              type="number"
              name="atomic_number"
              placeholder="e.g. 31"
              className="border px-3 py-2 rounded border-border-gray"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-text-gray-darker">Atomic Mass</label>
            <input
              type="number"
              name="atomic_mass"
              step="0.001"
              placeholder="e.g. 69.723"
              className="border px-3 py-2 rounded border-border-gray"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-text-gray-darker">Symbol</label>
            <input
              type="text"
              name="symbol"
              placeholder="e.g. Ga"
              className="border px-3 py-2 rounded border-border-gray"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-text-gray-darker">Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Gallium"
              className="border px-3 py-2 rounded border-border-gray"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-text-gray-darker">Description</label>
            <textarea
              name="description"
              placeholder="e.g. Gallium is a soft metal that melts in your hand."
              className="border px-3 py-2 rounded border-border-gray resize-none"
              rows={3}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-text-gray-darker">Category</label>
            <select name="category" className="border px-3 py-2 rounded border-border-gray">
              <option value="Metals">Metals</option>
              <option value="Non-Metals">Non-Metals</option>
              <option value="Noble Gases">Noble Gases</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-text-gray-darker">State</label>
            <input
              type="text"
              name="state"
              placeholder="e.g. Solid"
              className="border px-3 py-2 rounded border-border-gray"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-text-gray-darker">Price ($)</label>
            <input
              type="number"
              name="price"
              step="0.01"
              placeholder="e.g. 0.05"
              className="border px-3 py-2 rounded border-border-gray"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-text-gray-darker">Stock</label>
            <input
              type="number"
              name="stock"
              placeholder="e.g. 100"
              className="border px-3 py-2 rounded border-border-gray"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-text-gray-darker">Row</label>
              <input
                type="number"
                name="row"
                placeholder="e.g. 3"
                className="border px-3 py-2 rounded border-border-gray"
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-text-gray-darker">Column</label>
              <input
                type="number"
                name="column"
                placeholder="e.g. 13"
                className="border px-3 py-2 rounded border-border-gray"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary-blue hover:bg-secondary-blue text-white font-semibold px-4 py-2 rounded mt-2 cursor-pointer"
          >
            Create
          </button>
        </form>
      </Modal>

      {/*Modal de update*/}
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

              try {
                const updatedProduct = {
                  name: formData.get("name") as string,
                  price: Number(formData.get("price")),
                  stock: Number(formData.get("stock")),
                  atomic_number: Number(formData.get("atomic_number")),
                  atomic_mass: Number(formData.get("atomic_mass")),
                  symbol: formData.get("symbol") as string,
                  description: formData.get("description") as string,
                  category: formData.get("category") as string,
                  state: formData.get("state") as string,
                  row: Number(formData.get("row")),
                  column: Number(formData.get("column")),
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
            {/* CAMPOS PRINCIPAIS */}
            <div className="flex flex-col gap-1">
              <label className="text-text-gray-darker">Atomic Number</label>
              <input
                type="number"
                name="atomic_number"
                defaultValue={selectedProduct.atomic_number}
                className="border px-3 py-2 rounded border-border-gray"
                readOnly
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-text-gray-darker">Name</label>
              <input
                name="name"
                type="text"
                defaultValue={selectedProduct.name}
                className="border px-3 py-2 rounded border-border-gray"
              />
            </div>
      
            <div className="flex flex-col gap-1">
              <label className="text-text-gray-darker">Price</label>
              <input
                name="price"
                type="number"
                step="0.01"
                defaultValue={selectedProduct.price}
                className="border px-3 py-2 rounded border-border-gray"
              />
            </div>
      
            <div className="flex flex-col gap-1">
              <label className="text-text-gray-darker">Stock</label>
              <input
                name="stock"
                type="number"
                defaultValue={selectedProduct.stock}
                className="border px-3 py-2 rounded border-border-gray"
              />
            </div>
      
            {/* CAMPOS SECUNDÁRIOS */}
      
            <div className="flex flex-col gap-1">
              <label className="text-text-gray-darker">Atomic Mass</label>
              <input
                name="atomic_mass"
                type="number"
                step="0.001"
                defaultValue={selectedProduct.atomic_mass}
                className="border px-3 py-2 rounded border-border-gray"
              />
            </div>
      
            <div className="flex flex-col gap-1">
              <label className="text-text-gray-darker">Symbol</label>
              <input
                name="symbol"
                type="text"
                defaultValue={selectedProduct.symbol}
                className="border px-3 py-2 rounded border-border-gray"
              />
            </div>
      
            <div className="flex flex-col gap-1">
              <label className="text-text-gray-darker">Description</label>
              <textarea
                name="description"
                defaultValue={selectedProduct.description}
                className="border px-3 py-2 rounded border-border-gray resize-none"
                rows={3}
              />
            </div>
      
            <div className="flex flex-col gap-1">
              <label className="text-text-gray-darker">Category</label>
              <select
                name="category"
                defaultValue={selectedProduct.category}
                className="border px-3 py-2 rounded border-border-gray"
              >
                <option value="Metals">Metals</option>
                <option value="Non-Metals">Non-Metals</option>
                <option value="Noble Gases">Noble Gases</option>
              </select>
            </div>
      
            <div className="flex flex-col gap-1">
              <label className="text-text-gray-darker">State</label>
              <input
                name="state"
                type="text"
                defaultValue={selectedProduct.state}
                className="border px-3 py-2 rounded border-border-gray"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-1 w-1/2">
                <label className="text-text-gray-darker">Row</label>
                <input
                  name="row"
                  type="number"
                  defaultValue={selectedProduct.row}
                  className="border px-3 py-2 rounded border-border-gray"
                />
              </div>
              <div className="flex flex-col gap-1 w-1/2">
                <label className="text-text-gray-darker">Column</label>
                <input
                  name="column"
                  type="number"
                  defaultValue={selectedProduct.column}
                  className="border px-3 py-2 rounded border-border-gray"
                />
              </div>
            </div>
      
            <button
              type="submit"
              className="bg-primary-blue hover:bg-secondary-blue text-white font-semibold px-4 py-2 rounded mt-2 cursor-pointer"
            >
              Save Changes
            </button>
          </form>
        </Modal>
      )}



    </section>
  );
};

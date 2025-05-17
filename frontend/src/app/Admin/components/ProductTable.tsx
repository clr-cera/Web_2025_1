// src/components/ProductsTable.tsx
import React from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { FaRegTrashCan } from 'react-icons/fa6';

export interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
}

interface ProductsTableProps {
  data?: Product[];
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ data = [] }) => {
  return (
    <section className="bg-white shadow rounded p-4 mt-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <BsBoxSeam size={25} />
          <h2 className="ml-2 text-2xl font-semibold">Products</h2>
        </div>
        <button className="bg-primary-blue hover:bg-secondary-blue text-white font-medium px-4 py-2 rounded  cursor-pointer">
          Add Product
        </button>
      </div>

      <input
        type="text"
        placeholder="Search Products"
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
            {data.map(item => (
              <tr key={item.id} className="border-t border-border-gray">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4 font-medium">${item.price}</td>
                <td className="py-2 px-4">{item.stock}</td>
                <td className="py-2 px-4 space-x-2">
                  <button className="text-black">
                    <MdEdit size={20} />
                  </button>
                  <button className="text-red-600">
                    <FaRegTrashCan size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

"use client"

// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { BsShield } from 'react-icons/bs';
import { ProductsTable, Product } from './components/ProductTable';
import { AdminsTable, Admin } from './components/AdminTable';

type Tab = 'products' | 'admins';

export default function Page(){
  const [activeTab, setActiveTab] = useState<Tab>('products');

  // Exemplo de dados; aqui você poderia usar fetch / context / redux etc.
  const productsData: Product[] = [
    { id: 1, name: 'Gold',   price: '29.99', stock: 120 },
    { id: 2, name: 'Silver', price: '19.99', stock:  80 },
    { id: 3, name: 'Bronze', price: '9.99',  stock: 200 },
  ];
  const adminsData: Admin[] = [
    { id: 1, name: 'Admin 1',   email: 'um@admin.com',   role: 'Admin' },
    { id: 2, name: 'Admin 2',   email: 'dois@admin.com',   role: 'Admin' },
    { id: 3, name: 'Admin 3', email: 'tres@admin.com', role: 'Admin' },
  ];

  return (
    <div className="px-15 max-w-6xl mx-auto text-black mt-14">
      <header className="flex items-center space-x-3 mb-6">
        <div className="text-3xl">
          <BsShield size={50} className="text-text-gray-darker" />
        </div>
        <h1 className="text-2xl font-semibold text-text-gray-darker">
          Admin Dashboard
        </h1>
      </header>

      {/* Tabs */}
      <div className="flex flex-wrap w-fit mt-10 bg-background-gray p-1 rounded-md border-2 border-border-gray gap-3 sm:gap-5 select-none">
        <div
          onClick={() => setActiveTab('products')}
          className={`
            px-4 py-2 rounded-md cursor-pointer text-sm sm:text-base font-bold
            ${activeTab === 'products'
              ? 'bg-white text-text'
              : 'text-text-gray hover:bg-gray-100'}
          `}
        >
          Products
        </div>
        <div
          onClick={() => setActiveTab('admins')}
          className={`
            px-4 py-2 rounded-md cursor-pointer text-sm sm:text-base font-bold
            ${activeTab === 'admins'
              ? 'bg-white text-text'
              : 'text-text-gray hover:bg-gray-100'}
          `}
        >
          Admins
        </div>
      </div>

      {/* Conteúdo dinâmico */}
      {activeTab === 'products' ? (
        <ProductsTable data={productsData} />
      ) : (
        <AdminsTable   data={adminsData}   />
      )}
    </div>
  );
};

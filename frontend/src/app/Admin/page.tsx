// src/pages/Dashboard.tsx

"use client"

import React, { useState, useEffect } from 'react';
import { BsShield } from 'react-icons/bs';
import { ProductsTable, Product } from './components/ProductTable';
import { AdminsTable, Admin } from './components/AdminTable';
import { fetchDashboardProducts } from '@/services/elementsServices';
import { fetchUsers, User } from '@/services/adminServices'; // ajuste o caminho se for userService

type Tab = 'products' | 'admins';

export default function Page(){
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState<User[]>([]);


  const adminsData: Admin[] = [
    { id: 1, name: 'Admin 1', email: 'um@admin.com', role: 'Admin' },
    { id: 2, name: 'Admin 2', email: 'dois@admin.com', role: 'Admin' },
    { id: 3, name: 'Admin 3', email: 'tres@admin.com', role: 'Admin' },
  ];

useEffect(() => {
  const loadData = async () => {
    try {
      const products = await fetchDashboardProducts();
      const users = await fetchUsers();
      setProductsData(products.map(product => ({
        ...product,
        price: String(product.price),
      })));
      setUsersData(users);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);


  return (
    <div className="px-15 max-w-6xl mx-auto text-black pt-24">
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
        loading ? <p className="mt-10 text-gray-500">Carregando produtos...</p> :
        <ProductsTable data={productsData} />
      ) : (
      <AdminsTable data={usersData.filter(user => user.role === 'Admin')} />
      )}
    </div>
  );
};

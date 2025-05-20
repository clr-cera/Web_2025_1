"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { BsShield } from 'react-icons/bs';
import { ProductsTable } from './components/ProductTable';
import { AdminsTable, Admin } from './components/AdminTable';
import { fetchDashboardProducts } from '@/services/elementsServices';
import { fetchUsers, User } from '@/services/adminServices';
import { ElementType } from '@/services/elementsServices';

type Tab = 'products' | 'admins';

export default function Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const [productsData, setProductsData] = useState<ElementType[]>([]);
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState<User[]>([]);
  const [authorized, setAuthorized] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/Login");
      return;
    }

    try {
      const parsed = JSON.parse(user);
      const role = parsed.role;
      setUserRole(role);

      if (role !== "Admin" && role !== "Super Admin") {
        router.push("/");
        return;
      }

      setAuthorized(true);
    } catch {
      router.push("/Login");
    }
  }, []);

  useEffect(() => {
    if (!authorized) return;

    const loadData = async () => {
      try {
        const products = await fetchDashboardProducts();
        const users = await fetchUsers();
        setProductsData(products);
        setUsersData(users);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [authorized]);

  if (!authorized) return null;

  const isSuperAdmin = userRole === "Super Admin";

  return (
    <div className="px-15 max-w-6xl mx-auto text-black pt-24 min-h-screen">
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
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 rounded-md cursor-pointer text-sm sm:text-base font-bold
            ${activeTab === "products" ? "bg-white text-text" : "text-text-gray hover:bg-gray-100"}`}
        >
          Products
        </div>

        {isSuperAdmin && (
          <div
            onClick={() => setActiveTab("admins")}
            className={`px-4 py-2 rounded-md cursor-pointer text-sm sm:text-base font-bold
              ${activeTab === "admins" ? "bg-white text-text" : "text-text-gray hover:bg-gray-100"}`}
          >
            Admins
          </div>
        )}
      </div>

      {/* Conteúdo dinâmico */}
      {activeTab === "products" ? (
        loading ? <p className="mt-10 text-gray-500">Carregando produtos...</p> :
        <ProductsTable data={productsData} />
      ) : (
        isSuperAdmin ? (
          <AdminsTable data={usersData.filter(user => user.role.toLowerCase().includes("admin"))} />
        ) : (
          <p className="mt-10 text-red-500 font-semibold">Você não tem permissão para acessar esta seção.</p>
        )
      )}
    </div>
  );
}

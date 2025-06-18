"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { BsShield } from 'react-icons/bs';
import { ProductsTable } from './components/ProductTable';
import { AdminsTable } from './components/AdminTable';
import { fetchDashboardProducts } from '@/services/elementsServices';
import { fetchUsers, User } from '@/services/adminServices';
import { ElementType } from '@/services/elementsServices';

type Tab = 'products' | 'admins';

export default function Page() {
  const router = useRouter();

  // Estados principais
  const [activeTab, setActiveTab] = useState<Tab>('products'); // aba selecionada
  const [productsData, setProductsData] = useState<ElementType[]>([]); // dados de produtos
  const [loading, setLoading] = useState(true); // carregamento
  const [usersData, setUsersData] = useState<User[]>([]); // dados de usuários
  const [authorized, setAuthorized] = useState(false); // controle de acesso
  const [userRole, setUserRole] = useState<string | null>(null); // tipo do usuário

  // Verifica se o usuário está logado e autorizado
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

  // Carrega os dados (produtos e usuários) após verificação de permissão
  useEffect(() => {
    if (!authorized) return;

    const loadData = async () => {
      try {
        const products = await fetchDashboardProducts();
        if (userRole === "Super Admin") {
          const users = await fetchUsers();
          setUsersData(users);
        }
        setProductsData(products);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [authorized]);

  // Enquanto não autorizado, não renderiza nada
  if (!authorized) return null;

  const isSuperAdmin = userRole === "Super Admin";

  return (
    <div className="px-15 max-w-6xl mx-auto text-black pt-24 min-h-screen">
      {/* Cabeçalho da dashboard */}
      <header className="flex items-center space-x-3 mb-6">
        <div className="text-3xl">
          <BsShield size={50} className="text-text-gray-darker" />
        </div>
        <h1 className="text-2xl font-semibold text-text-gray-darker">
          Admin Dashboard
        </h1>
      </header>

      {/* Tabs de navegação */}
      <div className="flex flex-wrap w-fit mt-10 bg-background-gray p-1 rounded-md border-2 border-border-gray gap-3 sm:gap-5 select-none">
        <div
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 rounded-md cursor-pointer text-sm sm:text-base font-bold
            ${activeTab === "products" ? "bg-white text-text" : "text-text-gray hover:bg-gray-100"}`}
        >
          Products
        </div>

        {/* Aba "Admins" aparece somente para Super Admin */}
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

      {/* Conteúdo baseado na aba ativa */}
      {activeTab === "products" ? (
        loading ? (
          <p className="mt-10 text-gray-500">Carregando produtos...</p>
        ) : (
          <ProductsTable data={productsData} />
        )
      ) : (
        isSuperAdmin ? (
          <AdminsTable data={usersData.filter(user => user.role.toLowerCase().includes("admin"))} />
        ) : (
          <p className="mt-10 text-red-500 font-semibold">
            Você não tem permissão para acessar esta seção.
          </p>
        )
      )}
    </div>
  );
}

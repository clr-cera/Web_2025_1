"use client";

import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { FaRegTrashCan } from 'react-icons/fa6';
import { BsShield } from 'react-icons/bs';
import Modal from '@/components/Modal';
import { createUser, updateUser, deleteUser } from '@/services/adminServices';

// Tipo de dados para um Admin
export interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Props esperadas: uma lista opcional de admins
interface AdminsTableProps {
  data?: Admin[];
}

// Componente da tabela de administradores
export const AdminsTable: React.FC<AdminsTableProps> = ({ data = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Filtro de busca por nome ou email
  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-white shadow rounded p-4 mt-5">
      {/* Cabeçalho da seção */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <BsShield size={22} />
          <h2 className="ml-2 text-2xl font-semibold">Users</h2>
        </div>
        <button 
          className="bg-primary-blue hover:bg-secondary-blue text-white font-medium px-4 py-2 rounded cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Add User
        </button>
      </div>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 border border-border-gray rounded mb-4"
      />

      {/* Tabela de usuários */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-border-gray">
          <thead>
            <tr className="bg-secondary-gray text-left text-text-gray text-sm">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((admin) => (
              <tr key={admin.id} className="border-t border-border-gray">
                <td className="py-2 px-4">{admin.name}</td>
                <td className="py-2 px-4">{admin.email}</td>
                <td className="py-2 px-4">{admin.role}</td>
                <td className="py-2 px-4 space-x-2">
                  {/* Botão de editar */}
                  <button
                    className="text-black cursor-pointer"
                    onClick={() => {
                      setSelectedAdmin(admin);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <MdEdit size={20} />
                  </button>

                  {/* Botão de deletar */}
                  <button
                    className="text-red-600 cursor-pointer"
                    onClick={async () => {
                      if (confirm("Tem certeza que deseja deletar este admin?")) {
                        try {
                          await deleteUser(admin.id);
                          location.reload(); // Idealmente substituir por atualização via estado
                        } catch (err) {
                          console.error("Erro ao deletar admin:", err);
                        }
                      }
                    }}
                  >
                    <FaRegTrashCan size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {/* Caso nenhum usuário seja encontrado */}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-text-gray">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de criação de novo admin */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Admin">
        <p className='font-semibold text-text-gray mb-10'>Fill in details for new Admin</p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const name = (form[0] as HTMLInputElement).value;
            const email = (form[1] as HTMLInputElement).value;
            const role = (form[3] as HTMLSelectElement).value;

            try {
              await createUser({ name, email, role });
              setIsModalOpen(false);
              location.reload();
            } catch (err) {
              console.error("Erro ao criar admin:", err);
            }
          }} 
          className="flex flex-col gap-4 mt-2"
        >
          <div className='flex flex-col gap-1'>
            <label className='text-text-gray-darker'>Name</label>
            <input type="text" placeholder="ex: Gabriel" className="border px-3 py-2 rounded border-border-gray" />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-text-gray-darker'>Email</label>
            <input type="email" placeholder="ex: gabriel@email.com" className="border px-3 py-2 rounded border-border-gray" />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-text-gray-darker'>Password</label>
            <input type="password" placeholder="*****" className="border px-3 py-2 rounded border-border-gray" />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-text-gray-darker'>Role</label>
            <select className="border px-3 py-2 rounded border-border-gray">
              <option value="Admin">Admin</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-primary-blue hover:bg-secondary-blue text-white font-semibold px-4 py-2 rounded mt-2 cursor-pointer"
          >
            Create
          </button>
        </form>
      </Modal>

      {/* Modal de edição de admin */}
      {selectedAdmin && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedAdmin(null);
          }}
          title={`Edit Admin: ${selectedAdmin.name}`}
        >
          <p className='font-semibold text-text-gray mb-10'>Update admin information</p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const name = (form[0] as HTMLInputElement).value;
              const email = (form[1] as HTMLInputElement).value;
              const role = (form[2] as HTMLSelectElement).value;

              try {
                if (selectedAdmin) {
                  await updateUser(selectedAdmin.id, { name, email, role });
                  setIsEditModalOpen(false);
                  setSelectedAdmin(null);
                  location.reload();
                }
              } catch (err) {
                console.error("Erro ao atualizar admin:", err);
              }
            }} 
            className="flex flex-col gap-4 mt-2"
          >
            <div className="flex flex-col gap-1">
              <label className="text-text-gray-darker">Name</label>
              <input
                type="text"
                defaultValue={selectedAdmin.name}
                className="border px-3 py-2 rounded border-border-gray"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-text-gray-darker">Email</label>
              <input
                type="email"
                defaultValue={selectedAdmin.email}
                className="border px-3 py-2 rounded border-border-gray"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-text-gray-darker">Role</label>
              <select
                defaultValue={selectedAdmin.role}
                className="border px-3 py-2 rounded border-border-gray"
              >
                <option value="Admin">Admin</option>
                <option value="Super Admin">Super Admin</option>
              </select>
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

// src/components/AdminsTable.tsx
import React from 'react';
import { BsShield } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
import { FaRegTrashCan } from 'react-icons/fa6';

export interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AdminsTableProps {
  data?: Admin[];
}

export const AdminsTable: React.FC<AdminsTableProps> = ({ data = [] }) => {
  return (
    <section className="bg-white shadow rounded p-4 mt-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <BsShield size={25} />
          <h2 className="ml-2 text-2xl font-semibold">Admins</h2>
        </div>
        <button className="bg-primary-blue hover:bg-secondary-blue text-white font-medium px-4 py-2 rounded cursor-pointer">
          Add Admin
        </button>
      </div>

      <input
        type="text"
        placeholder="Search Admins"
        className="w-full px-3 py-2 border border-border-gray rounded mb-4"
      />

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
            {data.map(item => (
              <tr key={item.id} className="border-t border-border-gray">
                <td className="py-2 px-4 font-semibold">{item.name}</td>
                <td className="py-2 px-4">{item.email}</td>
                <td className="py-2 px-4">{item.role}</td>
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

// src/components/AdminTable.tsx
"use client";

import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { FaRegTrashCan } from 'react-icons/fa6';
import { BsShield } from 'react-icons/bs';

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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-white shadow rounded p-4 mt-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <BsShield size={22} />
          <h2 className="ml-2 text-2xl font-semibold">Users</h2>
        </div>
        <button className="bg-primary-blue hover:bg-secondary-blue text-white font-medium px-4 py-2 rounded cursor-pointer">
          Add User
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
            {filteredData.map((admin) => (
              <tr key={admin.id} className="border-t border-border-gray">
                <td className="py-2 px-4">{admin.name}</td>
                <td className="py-2 px-4">{admin.email}</td>
                <td className="py-2 px-4">{admin.role}</td>
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
    </section>
  );
};

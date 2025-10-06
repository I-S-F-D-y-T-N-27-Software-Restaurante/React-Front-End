"use client";

import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: "Camarero" | "Cocinero" | "Invitado";
};

const mockUsers: User[] = [
  { id: 1, name: "Juan Perez", email: "juan@example.com", role: "Camarero" },
  { id: 2, name: "Maria Gomez", email: "maria@example.com", role: "Camarero" },
  { id: 3, name: "Carlos Ruiz", email: "carlos@example.com", role: "Cocinero" },
  { id: 4, name: "Ana Lopez", email: "ana@example.com", role: "Invitado" },
];

export function UsersView() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleRoleChange = (id: number, newRole: User["role"]) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
  };

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-white">Usuarios</h1>
      <div className="flex flex-wrap gap-8 mt-24 m-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className="min-w-[320px] bg-black/96 rounded-xl shadow-lg p-5 flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="font-semibold text-xl text-white truncate">
              {user.name}
            </h2>
            <p className="text-gray-400 truncate">{user.email}</p>

            <div className="flex flex-col mt-3">
              <label className="mb-2 font-medium text-gray-200">Rol</label>
              <select
                value={user.role}
                onChange={(e) =>
                  handleRoleChange(user.id, e.target.value as User["role"])
                }
                className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="Admin">Admin</option>
                <option value="Camarero">Camarero</option>
                <option value="Cocinero">Cocinero</option>
                <option value="Invitado">Invitado</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

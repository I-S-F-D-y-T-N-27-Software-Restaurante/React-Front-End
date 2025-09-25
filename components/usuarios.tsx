"use client";

import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role:  "Camarero" | "Cocinero" | "Invitado";
};

const mockUsers: User[] = [
  { id: 1, name: "Juan Perez", email: "juan@example.com", role: "Camarero" },
  { id: 2, name: "Maria Gomez", email: "maria@example.com", role: "Camarero" },
  { id: 3, name: "Carlos Ruiz", email: "carlos@example.com", role: "Cocinero" },
  { id: 4, name: "Ana Lopez", email: "ana@example.com", role: "Invitado" },
];

export default function UsersView() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleRoleChange = (id: number, newRole: User["role"]) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Usuarios</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-lg shadow p-4 flex flex-col gap-2"
          >
            <h2 className="font-semibold text-lg truncate">{user.name}</h2>
            <p className="text-gray-600 truncate">{user.email}</p>

            <div className="flex flex-col mt-2">
              <label className="mb-1 font-medium">Rol</label>
              <select
                value={user.role}
                onChange={(e) =>
                  handleRoleChange(user.id, e.target.value as User["role"])
                }
                className="border rounded px-2 py-1"
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

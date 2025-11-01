"use client";

import { useState } from "react";
import { Role, Roles } from "../lib/roles";

type User = {
  id: number;
  name: string;
  email: string;
  roles: Role[];
};

const mockUsers: User[] = [
  {
    id: 1,
    name: "Juan Perez",
    email: "juan@example.com",
    roles: [Roles.ADMIN, Roles.CASHIER],
  },
  {
    id: 2,
    name: "Maria Gomez",
    email: "maria@example.com",
    roles: [Roles.COOK],
  },
  {
    id: 3,
    name: "Carlos Ruiz",
    email: "carlos@example.com",
    roles: [Roles.CASHIER],
  },
  {
    id: 4,
    name: "Ana Lopez",
    email: "ana@example.com",
    roles: [Roles.CASHIER],
  },
];

export function UsersView() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-white">Usuarios</h1>
      <div className="flex flex-wrap gap-8 mt-24 m-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className="min-w-[320px] bg-black/90 rounded-xl shadow-lg p-8 flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="font-semibold text-xl text-white truncate">
              {user.name}
            </h2>
            <p className="text-gray-400 truncate">{user.email}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              {user.roles.map((role: string) => {
                const color =
                  role === Roles.ADMIN
                    ? "bg-purple-600"
                    : role === Roles.WAITER
                    ? "bg-blue-600"
                    : role === Roles.COOK
                    ? "bg-green-600"
                    : role === Roles.CASHIER
                    ? "bg-yellow-600"
                    : "bg-gray-600";

                return (
                  <span
                    key={role}
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full text-white ${color}`}
                  >
                    {role}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

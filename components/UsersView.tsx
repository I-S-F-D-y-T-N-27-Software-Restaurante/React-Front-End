"use client";

import { useEffect, useState } from "react";
import { User } from "../lib/types";
import { Role, Roles } from "../lib/roles";
import { fetchUsersWithRoles } from "../lib/fetch";

export function UsersView() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    const data = await fetchUsersWithRoles();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const getRoleColor = (role: Role) => {
    switch (role) {
      case Roles.ADMIN:
        return "bg-purple-600";
      case Roles.WAITER:
        return "bg-blue-600";
      case Roles.COOK:
        return "bg-green-600";
      case Roles.CASHIER:
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Usuarios</h1>
        <button
          onClick={loadUsers}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Actualizar
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-white">Cargando...</div>
      ) : (
        <div className="flex flex-wrap gap-8 mt-8 m-auto">
          {users.map((user) => {
            const roleNames: Role[] = [];

            // Include ADMIN if user has admin property or custom logic
            // Example: if your User type has admin boolean, adjust accordingly
            // For now, just check if any role object has name === Roles.ADMIN
            if (user.roles.some((r) => r.name === Roles.ADMIN)) {
              roleNames.push(Roles.ADMIN);
            }

            user.roles.forEach((r) => {
              if (r.name !== Roles.ADMIN) roleNames.push(r.name);
            });

            return (
              <div
                key={user.id}
                className="min-w-[320px] bg-black/90 rounded-xl shadow-lg p-8 flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="font-semibold text-xl text-white truncate">
                  {user.name}
                </h2>
                <p className="text-gray-400 truncate">{user.email}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {roleNames.map((role) => (
                    <span
                      key={role}
                      className={`inline-block px-3 py-2 text-sm font-medium rounded-full text-white ${getRoleColor(
                        role
                      )}`}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

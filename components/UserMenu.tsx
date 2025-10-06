
"use client";

import Link from "next/link";
import { User, Home, Users, Table, ClipboardList, Box } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { logOut } from "../lib/auth";
import { useRouter } from "next/navigation";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative flex items-center mr-4 md:mr-10">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full bg-purple-200 hover:bg-purple-300 transition"
      >
        <User className="w-7 h-7 md:w-9 md:h-9 text-purple-700" />
      </button>

      {open && (
        <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md w-60 py-4 px-4 z-50">
          <div className="flex flex-col items-start text-gray-800">
            <div className="font-semibold text-lg truncate">{user.name}</div>
            <div className="text-sm text-gray-500 truncate">{user.email}</div>
          </div>

          <div className="border-t border-gray-200 my-3"></div>

          <button
            onClick={async () => {
              try {
                console.log("Cerrar sesión");
                setOpen(false);
                const res = await logOut();
                console.log(res)
                router.push("/login");
              } catch (err: any) {
                console.log(err.message);
              }
            }}
            className="w-full text-left px-2 py-2 rounded-md hover:bg-purple-100 text-gray-700"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

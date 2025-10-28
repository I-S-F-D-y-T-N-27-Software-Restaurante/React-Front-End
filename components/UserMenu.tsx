"use client";

import { User } from "lucide-react";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { logOut } from "../lib/auth";
import { useRouter } from "next/navigation";
import { useUser } from "../hooks/useRoleContext";

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const { loading } = useUser();
  const menuRef = useRef<HTMLDivElement>(null);

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
        <>
          {loading ? (
            <div className="absolute right-0 top-12 w-60 h-24 flex items-center justify-center bg-white shadow-lg rounded-md z-50">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <UserPopup onClose={() => setOpen(false)} />
          )}
        </>
      )}
    </div>
  );
}

function UserPopup({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { user, loading, error: userError } = useUser();

  const Wrapper = ({ children }: PropsWithChildren) => (
    <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md w-60 py-4 px-4 z-50">
      <div className="flex flex-col items-start text-gray-800">{children}</div>

      <div className="border-t border-gray-200 my-3"></div>

      <button
        onClick={async () => {
          try {
            onClose();
            await logOut();
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
  );

  return (
    <Wrapper>
      <div className="font-semibold text-lg truncate">
        User ID {user?.user_id}
      </div>
      <div className="text-sm text-gray-500 truncate my-1">
        {user?.user_email}
      </div>
      <div className="text-sm text-gray-500 my-2">
        <div className="flex flex-wrap gap-2">
          {user?.roles?.map((role: string, index: number) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium capitalize"
            >
              {role.toLowerCase().replace("_", " ")}
            </span>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

"use client";

import { User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../hooks/useRoleContext";
import {UserPopup} from './UserPopup';

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



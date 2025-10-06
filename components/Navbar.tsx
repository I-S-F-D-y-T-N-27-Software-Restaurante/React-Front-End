"use client"
import Link from "next/link";
import { User, Home, Users, Table, ClipboardList, Box } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { logOut } from "../lib/auth";
import { UserMenu } from "./UserMenu";

export function Navbar() {
  return (
    <nav className="w-full bg-black text-white shadow-md p-2">
      <div className="flex justify-between items-center h-14">
        <div className="flex space-x-4 ml-4 md:ml-20">
          <Link
            href="/"
            className="hover:text-gray-300 flex items-center gap-1"
          >
            <Home className="w-6 h-6 md:w-8 md:h-8" />
            <span className="hidden md:inline text-lg">INICIO</span>
          </Link>
          <Link
            href="/usuarios"
            className="hover:text-gray-300 flex items-center gap-1"
          >
            <Users className="w-6 h-6 md:w-8 md:h-8" />
            <span className="hidden md:inline text-lg">USUARIOS</span>
          </Link>
          <Link
            href="/mesas"
            className="hover:text-gray-300 flex items-center gap-1"
          >
            <Table className="w-6 h-6 md:w-8 md:h-8" />
            <span className="hidden md:inline text-lg">MESAS</span>
          </Link>
          <Link
            href="/pedidos"
            className="hover:text-gray-300 flex items-center gap-1"
          >
            <ClipboardList className="w-6 h-6 md:w-8 md:h-8" />
            <span className="hidden md:inline text-lg">PEDIDOS</span>
          </Link>
          <Link
            href="/inventario"
            className="hover:text-gray-300 flex items-center gap-1"
          >
            <Box className="w-6 h-6 md:w-8 md:h-8" />
            <span className="hidden md:inline text-lg">INVENTARIO</span>
          </Link>
        </div>

        <UserMenu />
      </div>
    </nav>
  );
}

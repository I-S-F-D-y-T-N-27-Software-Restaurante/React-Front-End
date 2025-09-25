import Link from "next/link";
import { User, Home, Users, Table, ClipboardList, Box } from "lucide-react";

export default function Navbar() {
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
            <span className="hidden md:inline text-lg">
              GESTION DE USUARIOS
            </span>
          </Link>
          <Link
            href="/mesas"
            className="hover:text-gray-300 flex items-center gap-1"
          >
            <Table className="w-6 h-6 md:w-8 md:h-8" />
            <span className="hidden md:inline text-lg">GESTION DE MESAS</span>
          </Link>
          <Link
            href="/pedidos"
            className="hover:text-gray-300 flex items-center gap-1"
          >
            <ClipboardList className="w-6 h-6 md:w-8 md:h-8" />
            <span className="hidden md:inline text-lg">GESTION DE PEDIDOS</span>
          </Link>
          <Link
            href="/inventario"
            className="hover:text-gray-300 flex items-center gap-1"
          >
            <Box className="w-6 h-6 md:w-8 md:h-8" />
            <span className="hidden md:inline text-lg">
              GESTION DE INVENTARIO
            </span>
          </Link>
        </div>
        <div className="flex items-center mr-4 md:mr-10">
          <Link
            href="/perfil"
            className="p-2 rounded-full bg-purple-200 hover:bg-purple-300"
          >
            <User className="w-7 h-7 md:w-9 md:h-9 text-purple-700" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

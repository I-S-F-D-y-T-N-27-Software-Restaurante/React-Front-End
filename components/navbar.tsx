import Link from "next/link";
import { User } from "lucide-react"; 

export default function Navbar() {
  return (
    <nav className="w-full bg-black text-white shadow-md bourder- p-2 rounded-bl-lg rounded-br-lg">
        <div className="flex justify-between items-center h-14  ">
            <div className="flex space-x-20 ml-20">
                <Link href="/" className="hover:text-gray-300 text-lg">
                    INICIO
                </Link>
                <Link href="/usuarios" className="hover:text-gray-300 text-lg">
                    GESTION DE USUARIOS
                </Link>
                <Link href="/mesas" className="hover:text-gray-300 text-lg">
                    GESTION DE MESAS
                </Link>
                <Link href="/pedidos" className="hover:text-gray-300 text-lg">
                    GESTION DE PEDIDOS
                </Link>
                <Link href="/inventario" className="hover:text-gray-300 text-lg">
                    GESTION DE INVENTARIO
                </Link>
            </div>
            <div className="flex items-center mr-10">
                <Link href="/perfil" className="p-2 rounded-full bg-purple-200 hover:bg-purple-300">
                    <User className="w-7 h-7 text-purple-700" />
                </Link>
            </div>
        </div>
    </nav>
  );
}
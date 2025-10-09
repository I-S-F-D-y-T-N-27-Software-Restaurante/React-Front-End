import Link from "next/link";
import { Navbar } from "@/components/Navbar";

interface MenuItem {
  href: string;
  label: string;
}

export default function Inicio() {
  const menuItems: MenuItem[] = [
    { href: "/pedidos", label: "Pedidos" },
    { href: "/mesas", label: "Mesas" },
    { href: "/inventario", label: "Inventario" },
    { href: "/usuarios", label: "Usuarios" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-full max-w-5xl px-5 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-40 gap-y-10 justify-items-center">
            {menuItems.map((item) => (
              <CardLink key={item.href} href={item.href}>
                {item.label}
              </CardLink>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

interface CardLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function CardLink({ href, children, className = "" }: CardLinkProps) {
  return (
    <Link href={href} className="block">
      <div
        className={`w-100 h-80 rounded-md shadow-md flex items-center justify-center select-none bg-[#dcdc2a] hover:brightness-95 transition-all cursor-pointer ${className}`}
        role="button"
      >
        <span className="text-white font-extrabold text-3xl tracking-wider uppercase">
          {children}
        </span>
      </div>
    </Link>
  );
}

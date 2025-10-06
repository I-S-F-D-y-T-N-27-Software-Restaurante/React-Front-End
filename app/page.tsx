import Link from "next/link";
import Navbar from "@/components/navbar";

export default function Home() {
  const routes = [
    { href: "/pedidos", label: "Pedidos" },
    { href: "/mesas", label: "Mesas" },
    { href: "/inventario", label: "Inventario" },
    { href: "/usuarios", label: "Usuarios" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex items-center justify-center align-center">
        <div className="w-full max-w-5xl px-5 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-40 gap-y-10 justify-items-center">
            {routes.map((route) => (
              <RouteCard
                key={route.href}
                href={route.href}
                label={route.label}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

type RouteCardProps = {
  href: string;
  label: string;
  bgColor?: string;
};

function RouteCard({ href, label, bgColor = "#dcdc2a" }: RouteCardProps) {
  return (
    <Link href={href} className="block">
      <div
        className={`w-80 h-80 rounded-md shadow-md flex items-center justify-center select-none cursor-pointer transition-all hover:brightness-95`}
        style={{ backgroundColor: bgColor }}
        role="button"
      >
        <span className="text-white font-extrabold text-3xl tracking-wider uppercase">
          {label}
        </span>
      </div>
    </Link>
  );
}

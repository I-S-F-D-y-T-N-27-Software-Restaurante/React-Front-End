import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Role, routes } from "../lib/roles";
import { UserProvider, useUser } from "../hooks/useRoleContext";
import { Spinner } from "../components/Spinner";
import { CardLink } from "../components/CardLink";

export default function Inicio() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-full max-w-5xl px-5 py-20">
          <UserProvider>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-40 gap-y-10 justify-items-center">
              {routes.map((route) =>
                route.href === "/" ? null : (
                  <CardLink
                    key={route.href}
                    href={route.href}
                    rolesAllowed={route.rolesAllowed}
                  >
                    {route.label}
                  </CardLink>
                )
              )}
            </div>
          </UserProvider>
        </div>
      </main>
    </>
  );
}

// export function CardLink({ href, children, className = "" }: CardLinkProps) {
//   return (
//     <Link href={href} className="block">
//       <div
//         className={`w-100 h-80 rounded-md shadow-md flex items-center justify-center select-none bg-[#dcdc2a] hover:brightness-95 transition-all cursor-pointer ${className}`}
//         role="button"
//       >
//         <span className="text-white font-extrabold text-3xl tracking-wider uppercase">
//           {children}
//         </span>
//       </div>
//     </Link>
//   );
// }

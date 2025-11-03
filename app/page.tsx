import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { UserProvider, useUser } from "../hooks/useRoleContext";
import { Spinner } from "../components/Spinner";
import { CardLink } from "../components/CardLink";
import {routes} from '../lib/routes';

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

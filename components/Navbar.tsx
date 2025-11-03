"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { User, Home, Users, Table, ClipboardList, Box } from "lucide-react";
import { logOut } from "../lib/auth";
import { UserMenu } from "./UserMenu";
import { AppRoute, routes } from "../lib/routes";
import { UserProvider, useUser } from "../hooks/useRoleContext";
import { Spinner } from "./Spinner";
import { Span } from "next/dist/trace";

export function Navbar() {
  return (
    <nav className="w-full bg-black text-white shadow-md p-2">
      <UserProvider>
        <div className="flex justify-between items-center h-14">
          <div className="flex space-x-4 ml-4 md:ml-20">
            {routes.map((route) => (
              <NavLink
                key={route.href}
                Icon={route.Icon}
                href={route.href}
                label={route.label}
                rolesAllowed={route.rolesAllowed}
              />
            ))}
          </div>
          <UserMenu />
        </div>
      </UserProvider>
    </nav>
  );
}

export function NavLink({ href, label, Icon, rolesAllowed }: AppRoute) {
  const { error, user, loading } = useUser();
  const roles = user?.roles || [];

  if (loading) return <Spinner />;
  if (error) return <span className="text-red-500">Something went wrong.</span>;

  const hasAccess =
    roles.includes("admin") ||
    !rolesAllowed ||
    rolesAllowed.some((role) => roles.includes(role));

  const linkClass =
    "flex items-center gap-1 " +
    (hasAccess
      ? "hover:text-gray-300 text-white cursor-pointer"
      : "text-gray-500 cursor-not-allowed opacity-50");

  const linkContent = (
    <>
      {Icon && <Icon className="w-6 h-6 md:w-8 md:h-8" />}
      <span className="hidden md:inline text-lg">{label.toUpperCase()}</span>
    </>
  );

  if (!hasAccess) {
    // Render a muted, non-clickable link
    return <div className={linkClass}>{linkContent}</div>;
  }

  return (
    <Link href={href} className={linkClass}>
      {linkContent}
    </Link>
  );
}

"use client";

import Link from "next/link";
import { useUser } from "../hooks/useRoleContext";
import { Role } from "../lib/roles";
import { Spinner } from "./Spinner";

interface CardLinkProps {
  href: string;
  children: React.ReactNode;
  rolesAllowed?: Role[];
}

export function CardLink({ href, children, rolesAllowed }: CardLinkProps) {
  const { user, loading, error } = useUser();
  const roles = user?.roles || [];

  if (loading) return <Spinner />;

  if (error)
    return (
      <div className="w-100 h-80 rounded-md shadow-md flex items-center justify-center bg-red-100 text-red-600 font-semibold">
        Error loading user
      </div>
    );

  const hasAccess =
    roles.includes("admin") ||
    !rolesAllowed ||
    rolesAllowed.some((role) => roles.includes(role));

  const baseClasses =
    "w-100 h-80 rounded-md shadow-md flex items-center justify-center select-none transition-all " +
    (hasAccess
      ? "bg-[#dcdc2a] hover:brightness-95 cursor-pointer"
      : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60");

  const content = (
    <div className={baseClasses} role="button">
      <span className="text-white font-extrabold text-3xl tracking-wider uppercase">
        {children}
      </span>
    </div>
  );

  if (!hasAccess) return content;

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}

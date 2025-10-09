"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "../components/Spinner";

export default function RoleGuard({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAccess() {
      const res = await fetch("/api/me", { credentials: "include" });
      if (res.status === 401 || res.status === 404) {
        router.push("/login");
        return;
      }

      const data = await res.json();
      const roles: string[] = data.roles || [];

      if (
        !roles.includes("admin") &&
        !roles.some((r) => allowedRoles.includes(r))
      ) {
        router.push("/");
        return;
      }

      setHasAccess(true);
    }

    checkAccess();
  }, [allowedRoles, router]);

  if (hasAccess === null) return <Spinner />;
  return <>{children}</>;
}

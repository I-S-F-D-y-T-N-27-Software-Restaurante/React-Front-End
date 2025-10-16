import { User, Home, Users, Table, ClipboardList, Box } from "lucide-react";

export type Role = (typeof Roles)[keyof typeof Roles];

export const Roles = {
  WAITER: "waiter",
  COOK: "cook",
  CASHIER: "cashier",
  ADMIN: "admin",
} as const;

export type AppRoute = {
  href: string;
  label: string;
  rolesAllowed?: Role[];
  Icon?: typeof Home;
};

export const routes = [
  {
    href: "/",
    label: "Home",
    Icon: Home,
  },
  {
    href: "/pedidos",
    label: "Pedidos",
    rolesAllowed: [Roles.CASHIER, Roles.ADMIN],
    Icon: ClipboardList,
  },
  {
    href: "/mesas",
    label: "Mesas",
    rolesAllowed: [Roles.WAITER, Roles.ADMIN],
    Icon: Table,
  },
  {
    href: "/inventario",
    label: "Inventario",
    rolesAllowed: [Roles.COOK, Roles.ADMIN],
    Icon: Box,
  },
  {
    href: "/usuarios",
    label: "Usuarios",
    rolesAllowed: [Roles.ADMIN],
    Icon: Users,
  },
];

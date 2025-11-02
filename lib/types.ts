export type Role = (typeof Roles)[keyof typeof Roles];

export const Roles = {
  WAITER: "waiter",
  COOK: "cook",
  CASHIER: "cashier",
  ADMIN: "admin",
} as const;

export type User = {
  id: number;
  name: string;
  email: string;
  roles: { name: Role; profileId?: number }[];
};

export type UserDTO = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  waiter_profile?: { id: number; user_id: number } | null;
  cook_profile?: { id: number; user_id: number } | null;
  cashier_profile?: { id: number; user_id: number } | null;
};

export const OrderStatus = {
  UNASSIGNED: "unassigned",
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  READY: "ready",
  DELIVERED: "delivered",
  CANCELED: "canceled",
} as const;

export const RestaurantTableStatus = {
  AVAILABLE: "available",
  OCCUPIED: "occupied",
  RESERVED: "reserved",
  CLEANING: "cleaning",
  MAINTENANCE: "maintenance",
} as const;

export const STATUS_TRANSLATIONS: Record<RestaurantTableStatusType, string> = {
  available: "Disponible",
  occupied: "Ocupada",
  reserved: "Reservada",
  cleaning: "En limpieza",
  maintenance: "En mantenimiento",
};

export const CategoryOptions = {
  entrada: "Entrada",
  plato_principal: "Plato Principal",
  postre: "Postre",
  bebida: "Bebida",
  ensalada: "Ensalada",
  sopa: "Sopa",
  acompañamiento: "Acompañamiento",
  snack: "Snack",
  especial: "Especial",
} as const;

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];

export type RestaurantTableStatusType =
  (typeof RestaurantTableStatus)[keyof typeof RestaurantTableStatus];

export type RestaurantTable = {
  id: number;
  waiter_id: number;
  status: RestaurantTableStatusType;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type MenuItem = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  available: boolean;
  category: string | null;
  created_at: string;
  updated_at: string;
};

export type MenuItemDTO = Omit<MenuItem, "id" | "created_at" | "updated_at">;

export type UpdateMenuItemDTO = Partial<
  Pick<MenuItem, "description" | "price" | "available" | "category">
>;

export type Order = {
  id: number
  table_id: number
  waiter_id: number
  total: number
  menu_items: MenuItem[]
  status: OrderStatusType
  created_at: string
  updated_at: string
  deleted_at: string | null
}

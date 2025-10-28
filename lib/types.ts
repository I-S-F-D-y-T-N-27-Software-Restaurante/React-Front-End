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


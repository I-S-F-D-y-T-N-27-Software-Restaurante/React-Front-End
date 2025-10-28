import { CreateRestaurantTableDto } from "../components/Tables";
import { MenuItem, RestaurantTable, RestaurantTableStatusType } from "./types";

export async function fetchAllTables(): Promise<RestaurantTable[]> {
  const uri = `${process.env.NEXT_PUBLIC_API_URL}/tables`;

  const init: RequestInit = {
    method: "GET",
    credentials: "include",
  };

  const res = await fetch(uri, init);

  if (!res.ok) {
    console.log("Fetch failed");
    console.log("Status code:", res.status);
    console.log("Status text:", res.statusText);
    const data = await res.json();
    console.log(data.detail);
    return [];
  }

  const data = (await res.json()) as RestaurantTable[];
  return data;
}

export async function createTableFetch(
  table: CreateRestaurantTableDto
): Promise<RestaurantTable | null> {
  const uri = `${process.env.NEXT_PUBLIC_API_URL}/tables`;

  const res = await fetch(uri, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(table),
  });

  if (!res.ok) {
    console.log("Create table failed");
    console.log("Status code:", res.status);
    console.log("Status text:", res.statusText);
    const data = await res.json().catch(() => ({}));
    console.log(data.detail);
    return null;
  }

  const data = (await res.json()) as RestaurantTable;
  return data;
}

export async function deleteTableFetch(tableId: number): Promise<void> {
  const uri = `${process.env.NEXT_PUBLIC_API_URL}/tables/${tableId}`;

  const res = await fetch(uri, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.log("Create table failed");
    console.log("Status code:", res.status);
    console.log("Status text:", res.statusText);
    const data = await res.json().catch(() => ({}));
    console.log(data.detail);
  }
}

export async function fetchMenuItems(): Promise<MenuItem[]> {
  return [];
}

export async function createMenuItemFetch(
  item: Omit<MenuItem, "id" | "created_at" | "updated_at">
): Promise<void> {
  return;
}

export async function deleteMenuItemFetch(id: number): Promise<void> {
  return;
}

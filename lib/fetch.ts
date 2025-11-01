import { CreateRestaurantTableDto } from "../components/Tables";
import { Role, Roles } from "./roles";
import {
  MenuItem,
  MenuItemDTO,
  RestaurantTable,
  RestaurantTableStatusType,
  UpdateMenuItemDTO,
  User,
  UserDTO,
} from "./types";
import { logFailedFetch } from "./utils";

export async function fetchAllTables(): Promise<RestaurantTable[]> {
  const uri = `${process.env.NEXT_PUBLIC_API_URL}/tables`;

  const init: RequestInit = {
    method: "GET",
    credentials: "include",
  };

  const res = await fetch(uri, init);

  if (!res.ok) {
    logFailedFetch(res);
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
    logFailedFetch(res);
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
    logFailedFetch(res);
  }
}

export async function fetchMenuItems(): Promise<MenuItem[]> {
  const uri = `${process.env.NEXT_PUBLIC_API_URL}/menu`;

  try {
    const res = await fetch(uri, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      logFailedFetch(res);
      return [];
    }

    const data = (await res.json()) as MenuItem[];
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function createMenuItemFetch(
  item: Omit<MenuItem, "id" | "created_at" | "updated_at">
): Promise<void> {
  const uri = `${process.env.NEXT_PUBLIC_API_URL}/menu`;

  try {
    const res = await fetch(uri, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!res.ok) {
      logFailedFetch(res);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteMenuItemFetch(id: number): Promise<void> {
  const uri = `${process.env.NEXT_PUBLIC_API_URL}/menu/${id}`;

  try {
    const res = await fetch(uri, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      logFailedFetch(res);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateMenuItemFetch(
  id: number,
  item: MenuItemDTO
): Promise<void> {
  const uri = `${process.env.NEXT_PUBLIC_API_URL}/menu/${id}`;

  const toUpdateMenuItemDTO = (item: MenuItemDTO): UpdateMenuItemDTO => {
    const { description, price, available, category } = item;
    return { description, price, available, category };
  };
  try {
    const res = await fetch(uri, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toUpdateMenuItemDTO(item)),
    });

    if (!res.ok) {
      logFailedFetch(res);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUsersWithRoles(): Promise<User[]> {
  const uri = `${process.env.NEXT_PUBLIC_API_URL}/resto/roles`;
  const res = await fetch(uri, { credentials: "include" });

  if (!res.ok) {
    logFailedFetch(res);
    return [];
  }

  const data: UserDTO[] = await res.json();

  const formatedData = data.map((user) => {
    const roles: { name: Role; profileId?: number }[] = [];

    if (user.waiter_profile)
      roles.push({ name: Roles.WAITER, profileId: user.waiter_profile.id });
    if (user.cook_profile)
      roles.push({ name: Roles.COOK, profileId: user.cook_profile.id });
    if (user.cashier_profile)
      roles.push({ name: Roles.CASHIER, profileId: user.cashier_profile.id });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roles,
    };
  });

  return formatedData;
}

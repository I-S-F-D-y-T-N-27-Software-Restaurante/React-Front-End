import { ORDER_STATUS_TRANSLATIONS, OrderStatusType, RestaurantTableStatusType, STATUS_TRANSLATIONS } from "./types";

export const logFailedFetch = async (res: Response) => {
  if (!res.ok) {
    console.log("Fetch failed");
    console.log("Status code:", res.status);
    console.log("Status text:", res.statusText);
    const data = await res.json();
    console.log(data.detail);
  }
};

export function translateTableStatus(
  status: RestaurantTableStatusType
): string {
  return STATUS_TRANSLATIONS[status] || "Desconocido";
}

export function translateOrderStatus(status: OrderStatusType): string {
  return ORDER_STATUS_TRANSLATIONS[status] || "Desconocido";
}

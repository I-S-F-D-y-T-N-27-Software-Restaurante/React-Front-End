"use client";
import { useState, useEffect } from "react";
import {
  MenuItem,
  Order,
  RestaurantTable,
  RestaurantTableStatus,
} from "../lib/types";
import { CategoryOptions } from "../lib/types";
import { fetchMenuItemsByCategory } from "../lib/fetch";
import { logFailedFetch, translateTableStatus } from "../lib/utils";
import { Trash2 } from "lucide-react";

export type ViewTablePopupProps = {
  table: RestaurantTable;
  onClose: () => void;
  onDelete: (tableId: number) => void;
};

export function ViewTablePopup({
  table,
  onClose,
  onDelete,
}: ViewTablePopupProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [existingOrders, setExistingOrders] = useState<Order[]>([]);
  const waiter_id = 1;

  async function fetchCurrentOrders() {
    try {
      const uri = `${process.env.NEXT_PUBLIC_API_URL}/orders/${table.id}`;
      const res = await fetch(uri, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setExistingOrders(Array.isArray(data) ? data : data ? [data] : []);
      } else {
        logFailedFetch(res);
      }
    } catch (err) {
      return [];
    }
  }

  useEffect(() => {
    fetchCurrentOrders();
  }, []);

  async function handleCategoryChange(category: string) {
    setSelectedCategory(category);
    try {
      const items = await fetchMenuItemsByCategory(category);
      setMenuItems(items);
    } catch (err) {
      console.error(err);
    }
  }

  function handleAddToOrder(item: any) {
    setOrderItems((prev) => [...prev, item]);
  }

  async function handleCreateOrder() {
    if (orderItems.length === 0) return;
    try {
      const uri = `${process.env.NEXT_PUBLIC_API_URL}/orders/${waiter_id}/${table.id}`;
      const res = await fetch(uri, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          menu_item_ids: orderItems.map((i) => i.id),
          total: orderItems.reduce((acc, curr) => acc + Number(curr.price), 0),
        }),
      });
      if (res.ok) {
        await fetchCurrentOrders();
        setOrderItems([]);
        setMenuItems([]);
        setSelectedCategory("");
      } else {
        console.error("Error creating order");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center p-2 gap-2">
            Mesa
            <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow-sm text-sm uppercase tracking-wide">
              {table.id}
            </span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 divide-x divide-gray-200">
          {/* LEFT: Info and Orders */}
          <div className="p-6 space-y-4 text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Estado</span>
              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  table.status === RestaurantTableStatus.AVAILABLE
                    ? "bg-green-100 text-green-700"
                    : table.status === RestaurantTableStatus.OCCUPIED
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {translateTableStatus(table.status)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-500">ID del Mesero</span>
              <span>{table.waiter_id || "N/A"}</span>
            </div>

            <div>
              <div className="font-medium text-gray-500 mb-1">Notas</div>
              <div className="bg-gray-50 p-2 rounded text-sm text-gray-800 border border-gray-200">
                {table.notes || "Sin notas"}
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
              <span>Creado: {new Date(table.created_at).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>
                Actualizado: {new Date(table.updated_at).toLocaleString()}
              </span>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-2">
                Órdenes actuales
              </h4>
              {existingOrders.length === 0 ? (
                <p className="text-sm text-gray-400">Sin órdenes</p>
              ) : (
                <div className="space-y-2">
                  {existingOrders.map((order, index) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-2 bg-gray-50"
                    >
                      <div className="text-md font-bold text-gray-700">
                        Orden {index + 1}
                      </div>
                      <ul className="text-sm text-gray-600 pl-3 list-disc">
                        {order.menu_items.map((item) => (
                          <li key={item.id}>{item.name}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Order Builder */}
          <div className="p-6 flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Nueva Orden
              </h3>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-2 py-1"
              >
                <option value="">Seleccionar categoría</option>
                {Object.entries(CategoryOptions).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                <h4 className="font-medium text-gray-700 mb-1">
                  Ítems del Menú
                </h4>
                {menuItems.length === 0 ? (
                  <p className="text-sm text-gray-400">Sin resultados</p>
                ) : (
                  menuItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b border-gray-100 py-1"
                    >
                      <span className="text-sm text-gray-700">{item.name}</span>
                      <button
                        className="bg-blue-600 text-white px-2 py-1 text-xs rounded hover:bg-blue-700"
                        onClick={() => handleAddToOrder(item)}
                      >
                        +
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                <h4 className="font-medium text-gray-700 mb-1">
                  Ítems en la Orden
                </h4>
                {orderItems.length === 0 ? (
                  <p className="text-sm italic text-gray-400">
                    No hay ítems en la orden
                  </p>
                ) : (
                  orderItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm text-gray-700"
                    >
                      <span>{item.name}</span>
                      <span className="text-gray-500">
                        ${Number(item.price).toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-between text-md font-medium text-gray-800 mt-2 border-t pt-2">
              <span>Total</span>
              <span>
                $
                {orderItems
                  .reduce((sum, item) => sum + Number(item.price), 0)
                  .toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCreateOrder}
              disabled={orderItems.length === 0}
              className={`mt-4 py-2 rounded-lg font-medium text-white transition ${
                orderItems.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Crear Orden
            </button>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => onDelete(table.id)}
            className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-700 active:bg-red-800 transition"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="bg-black/90 text-white px-5 py-2 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition ml-2"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

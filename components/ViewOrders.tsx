"use client";

import { useEffect, useState, useRef } from "react";
import {
  Order,
  OrderStatusType,
  UpdateOrderStatusDto,
  OrderStatus,
} from "../lib/types";
import { translateOrderStatus } from "../lib/utils";

export function VisualizeOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const sectionRefs = useRef<Record<OrderStatusType, HTMLDivElement | null>>({
    unassigned: null,
    pending: null,
    in_progress: null,
    ready: null,
    delivered: null,
    canceled: null,
  });

  async function fetchOrders() {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        credentials: "include",
      });
      const data: Order[] = await res.json();
      setOrders(data);
    } finally {
      setLoading(false);
    }
  }

  async function updateOrderStatus(
    orderId: number,
    newStatus: OrderStatusType
  ) {
    const uri = `${process.env.NEXT_PUBLIC_API_URL}/orders/update/${orderId}/${newStatus}`;
    await fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    fetchOrders();
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading orders...</p>;
  }

  const grouped = Object.values(OrderStatus).reduce((acc, status) => {
    acc[status] = orders.filter((o) => o.status === status);
    return acc;
  }, {} as Record<OrderStatusType, Order[]>);

  function scrollToStatus(status: OrderStatusType) {
    const el = sectionRefs.current[status];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-wrap gap-2 mb-4 sticky top-0 bg-white z-10 p-2 rounded-md shadow-sm">
        {Object.values(OrderStatus).map((status) => (
          <button
            key={status}
            onClick={() => scrollToStatus(status)}
            className="text-xs bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"
          >
            {translateOrderStatus(status)}
          </button>
        ))}
      </div>

      {Object.entries(grouped).map(([status, group]) => (
        <div
          key={status}
          ref={(el) => {
            sectionRefs.current[status as OrderStatusType] = el;
          }}
          className="border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-sm min-w-2xl"
        >
          <h2 className="text-lg font-semibold mb-3 capitalize">
            {translateOrderStatus(status as OrderStatusType)}
          </h2>
          {group.length === 0 && (
            <p className="text-sm text-gray-400">No orders</p>
          )}

          <div className="space-y-3">
            {group.map((order) => (
              <div key={order.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between mb-2">
                  <p className="font-semibold">Identificador pedido: {order.id}</p>
                  <p className="text-sm text-gray-500">
                    Table {order.table_id}
                  </p>
                </div>

                <ul className="text-sm mb-2">
                  {order.menu_items.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between border-b py-1"
                    >
                      <span>{item.name}</span>
                      <span>${item.price}</span>
                    </li>
                  ))}
                </ul>

                <p className="font-semibold text-right">
                  Total: ${order.total}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {Object.values(OrderStatus)
                    .filter((s) => s !== order.status)
                    .map((s) => (
                      <button
                        key={s}
                        onClick={() => updateOrderStatus(order.id, s)}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition"
                      >
                        {translateOrderStatus(s)}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

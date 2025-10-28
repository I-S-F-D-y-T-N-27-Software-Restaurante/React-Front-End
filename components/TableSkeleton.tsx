import { RestaurantTable } from "../lib/types";

export function TableSpinner() {
  // Create a fixed number of placeholder tables
  const placeholders: RestaurantTable[] = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    waiter_id: 0,
    status: "available",
    notes: null,
    created_at: "",
    updated_at: "",
  }));

  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-8">
        {placeholders.map((table) => (
          <div
            key={table.id}
            className="p-24 rounded-lg text-center text-white bg-gray-300 animate-pulse"
          >
            <div className="text-lg font-semibold">Mesa {table.id}</div>
            <div className="text-sm">Loading...</div>
          </div>
        ))}
      </div>
    </div>
  );
}

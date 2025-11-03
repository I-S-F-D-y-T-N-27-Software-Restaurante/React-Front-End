"use client";

import { Suspense, useEffect, useState } from "react";
import { RestaurantTable, RestaurantTableStatus } from "../lib/types";
import { Spinner } from "./Spinner";
import {
  createTableFetch,
  deleteTableFetch,
  fetchAllTables,
} from "../lib/fetch";
import { translateTableStatus } from "../lib/utils";
import { ViewTablePopup } from "./ViewTablePopup";
import { CreateTablePopup } from "./CreateTablePopup";

export type CreateRestaurantTableDto = Omit<
  RestaurantTable,
  "id" | "created_at" | "updated_at"
>;

export function TableManager() {
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [creating, setCreating] = useState(false);
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(
    null
  );
  const [state, onChange] = useState(0);

  const addTable = () => {
    setCreating(true);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAllTables();
      setTables(data);
    }
    fetchData();
  }, [state]);

  const saveNewTable = async (table: CreateRestaurantTableDto) => {
    setCreating(false);
    await createTableFetch(table);
    onChange(state + 1);
  };

  const deleteTable = async (tableId: number) => {
    console.log(tableId);
    await deleteTableFetch(tableId);
    setSelectedTable(null);
    onChange(state + 1);
  };

  const closePopup = () => setCreating(false);

  return (
    <>
      <div className="p-4">
        <div className="grid grid-cols-4 gap-8">
          {tables.map((table) => (
            <div
              onClick={() => setSelectedTable(table)}
              key={table.id}
              className={`p-24 rounded-lg text-center text-white ${
                table.status === RestaurantTableStatus.AVAILABLE
                  ? "bg-green-500"
                  : table.status === RestaurantTableStatus.OCCUPIED
                  ? "bg-red-500"
                  : "bg-orange-500"
              }`}
            >
              <div className="text-lg font-semibold">Mesa {table.id}</div>
              <div className="text-sm">
                {translateTableStatus(table.status).toLocaleUpperCase()}
              </div>
            </div>
          ))}

          <div
            className="p-24 rounded-lg bg-gray-400 cursor-pointer text-center text-white flex items-center justify-center border-2 border-dashed border-gray-600 hover:bg-gray-500 transition"
            onClick={addTable}
          >
            + Nueva Mesa
          </div>
        </div>

        {creating && (
          <CreateTablePopup onSave={saveNewTable} onClose={closePopup} />
        )}

        {selectedTable && (
          <ViewTablePopup
            table={selectedTable}
            onClose={() => setSelectedTable(null)}
            onDelete={deleteTable}
          />
        )}
      </div>
    </>
  );
}

"use client";

import { Suspense, useEffect, useState } from "react";
import {
  RestaurantTable,
  RestaurantTableStatus,
  RestaurantTableStatusType,
} from "../lib/types";
import { Spinner } from "./Spinner";
import {
  createTableFetch,
  deleteTableFetch,
  fetchAllTables,
} from "../lib/fetch";
import { TableSpinner } from "./TableSkeleton";
import {translateTableStatus} from '../lib/utils';

export function TableManager() {
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [creating, setCreating] = useState(false);
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(
    null
  );
  const [state, onChange] = useState(0);

  const addTable = () => {
    setCreating(true); // open popup
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
              <div className="text-sm">{translateTableStatus(table.status).toLocaleUpperCase()}</div>
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

export type CreateRestaurantTableDto = Omit<
  RestaurantTable,
  "id" | "created_at" | "updated_at"
>;
type CreateTablePopupProps = {
  onSave: (table: CreateRestaurantTableDto) => void;
  onClose: () => void;
};

function CreateTablePopup({ onSave, onClose }: CreateTablePopupProps) {
  const [status, setStatus] = useState<RestaurantTableStatusType>(
    RestaurantTableStatus.AVAILABLE
  );
  const [notes, setNotes] = useState<string>("");

  const save = () => {
    onSave({
      // TODO -> grab waiter_id from backend
      waiter_id: 1,
      status,
      notes: notes || null,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg min-w-[300px] w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Create Table</h2>

        <div className="flex flex-col">
          <label className="mb-1">Status:</label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as RestaurantTableStatusType)
            }
            className="border rounded px-2 py-1"
          >
            {Object.values(RestaurantTableStatus).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Notes:</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={save}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 active:bg-blue-900"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

type ViewTablePopupProps = {
  table: RestaurantTable;
  onClose: () => void;
  onDelete: (tableId: number) => void;
};

function ViewTablePopup({ table, onClose, onDelete }: ViewTablePopupProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
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

        <div className="p-6 space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">Status</span>
            <span
              className={`px-2 py-1 rounded-full text-sm font-semibold ${
                table.status === RestaurantTableStatus.AVAILABLE
                  ? "bg-green-100 text-green-700"
                  : table.status === RestaurantTableStatus.OCCUPIED
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {table.status}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-500">Waiter ID</span>
            <span>{table.waiter_id}</span>
          </div>

          <div>
            <div className="font-medium text-gray-500 mb-1">Notes</div>
            <div className="bg-gray-50 p-2 rounded text-sm text-gray-800 border border-gray-200">
              {table.notes || "No notes"}
            </div>
          </div>

          <div className="flex justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
            <span>Created: {new Date(table.created_at).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Updated: {new Date(table.updated_at).toLocaleString()}</span>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => onDelete(table.id)}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-700 active:bg-red-800 transition"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-700 active:bg-gray-900 transition ml-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { RestaurantTableStatusType, RestaurantTableStatus } from "../lib/types";
import { CreateRestaurantTableDto } from "./Tables";

export type CreateTablePopupProps = {
  onSave: (table: CreateRestaurantTableDto) => void;
  onClose: () => void;
};

export function CreateTablePopup({ onSave, onClose }: CreateTablePopupProps) {
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

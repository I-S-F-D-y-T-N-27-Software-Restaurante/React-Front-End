"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react"; 

type Table = {
  id: number;
  number: number;
  status: "Libre" | "Ocupado";
  waiter?: string;
  items?: string[];
  isNew?: boolean; 
};

const initialTables: Table[] = [
  { id: 1, number: 1, status: "Libre", items: [] },
  { id: 2, number: 2, status: "Ocupado", items: [] },
  { id: 3, number: 3, status: "Libre", items: [] },
];

const waiters = ["Juan", "Maria", "Carlos", "Ana"];

export function RestaurantTable() {
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const handleClick = (table: Table) => {
    setSelectedTable(table);
  };

  const closePopup = () => setSelectedTable(null);


  const addTable = () => {
    const nextNumber =
      tables.length > 0 ? Math.max(...tables.map((t) => t.number)) + 1 : 1;
    const nextId =
      tables.length > 0 ? Math.max(...tables.map((t) => t.id)) + 1 : 1;

    const newTable: Table = {
      id: nextId,
      number: nextNumber,
      status: "Libre",
      items: [],
      isNew: true,
    };

    setSelectedTable(newTable); 
  };

  const updateTable = (updated: Table) => {
    if (updated.isNew) {
      setTables([...tables, { ...updated, isNew: false }]);
    } else {
      
      setTables(tables.map((t) => (t.id === updated.id ? updated : t)));
    }
    setSelectedTable(null); 
  };

  const deleteTable = (id: number) => {
    setTables(tables.filter((t) => t.id !== id));
    setSelectedTable(null);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-8">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`p-24 rounded-lg cursor-pointer text-center text-white
              ${table.status === "Libre" ? "bg-green-500" : "bg-red-500"}`}
            onClick={() => handleClick(table)}
          >
            <div className="text-lg font-semibold">Mesa {table.number}</div>
            <div className="text-sm">{table.status}</div>
          </div>
        ))}

        <div
          className="p-24 rounded-lg bg-gray-400 cursor-pointer text-center text-white flex items-center justify-center border-2 border-dashed border-gray-600 hover:bg-gray-500 transition"
          onClick={addTable}
        >
          Agregar Mesa
        </div>
      </div>

      {selectedTable && (
        <TablePopup
          table={selectedTable}
          onClose={closePopup}
          onUpdate={updateTable}
          onDelete={deleteTable}
        />
      )}
    </div>
  );
}

type TablePopupProps = {
  table: Table;
  onClose: () => void;
  onUpdate: (table: Table) => void;
  onDelete: (id: number) => void;
};

function TablePopup({ table, onClose, onUpdate, onDelete }: TablePopupProps) {
  const [status, setStatus] = useState<"Libre" | "Ocupado">(table.status);
  const [waiter, setWaiter] = useState(table.waiter || "");
  const [itemInput, setItemInput] = useState("");
  const [items, setItems] = useState<string[]>(table.items || []);

  const toggleStatus = () =>
    setStatus(status === "Libre" ? "Ocupado" : "Libre");

  const addItem = () => {
    if (itemInput.trim() === "") return;
    const newItems = [...items, itemInput.trim()];
    setItems(newItems);
    setItemInput("");
  };

  const saveChanges = () => {
    onUpdate({ ...table, status, waiter, items });
  };

  const handleDelete = () => {
    if (table.isNew) {
      onClose(); 
    } else if (window.confirm(`¿Eliminar mesa ${table.number}?`)) {
      onDelete(table.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg min-w-[300px] w-full max-w-md space-y-4 relative">
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
          title="Eliminar mesa"
        >
          <Trash2 size={22} />
        </button>

        <h2 className="text-2xl font-bold text-center">
          {table.isNew ? "NUEVA MESA" : `MESA ${table.number}`}
        </h2>

        <div className="flex justify-between items-center">
          <span>Estado:</span>
          <button
            onClick={toggleStatus}
            className={`px-4 py-2 rounded text-white ${
              status === "Libre" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {status}
          </button>
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Mozo:</label>
          <select
            value={waiter}
            onChange={(e) => setWaiter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Seleccionar mozo</option>
            {waiters.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Agregar pedido (comida/bebida):</label>
          <div className="flex gap-2">
            <input
              value={itemInput}
              onChange={(e) => setItemInput(e.target.value)}
              className="border rounded px-2 py-1 flex-1"
              placeholder="Nombre del pedido"
            />
            <button
              onClick={addItem}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Agregar
            </button>
          </div>
        </div>

        {items.length > 0 && (
          <div>
            <h3 className="font-semibold mb-1">Pedido actual:</h3>
            <ul className="list-disc list-inside">
              {items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={saveChanges}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 active:bg-blue-900"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cerar
          </button>
        </div>
      </div>
    </div>
  );
}
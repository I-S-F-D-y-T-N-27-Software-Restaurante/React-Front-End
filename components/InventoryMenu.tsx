"use client";

import { useEffect, useState } from "react";
import { MenuItem } from "../lib/types";
import {
  fetchMenuItems,
  createMenuItemFetch,
  deleteMenuItemFetch,
} from "../lib/fetch";
import { menuItemMock } from "../lib/temp";
import { Plus, Trash2 } from "lucide-react";

export function MenuDashboard() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const loadMenuItems = async () => {
    setLoading(true);
    const data = await fetchMenuItems();
    // TODO -> remove this when removing mock
    // setMenuItems(data);
    setMenuItems(menuItemMock);
    setLoading(false);
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  const handleAdd = () => setCreating(true);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteMenuItemFetch(id);
      loadMenuItems();
    }
  };

  const handleSave = async (
    item: Omit<MenuItem, "id" | "created_at" | "updated_at">
  ) => {
    await createMenuItemFetch(item);
    setCreating(false);
    loadMenuItems();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Items</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
        >
          Crear
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-black/90 text-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
              {item.description && (
                <p className="text-gray-300 text-sm mb-2">{item.description}</p>
              )}
              <p className="font-bold text-lg mb-1">${item.price.toFixed(2)}</p>
              <p
                className={`font-medium mb-1 ${
                  item.available ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.available ? "Available" : "Unavailable"}
              </p>
              {item.category && (
                <p className="text-gray-400 text-sm mb-2">
                  Category: {item.category}
                </p>
              )}

              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="bg-gray-700 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600/60 text-white px-3 py-1 rounded-lg hover:bg-red-500 transition-colors duration-200"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {creating && (
        <MenuItemPopup onClose={() => setCreating(false)} onSave={handleSave} />
      )}

      {selectedItem && (
        <MenuItemPopup
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

type MenuItemPopupProps = {
  item?: MenuItem;
  onClose: () => void;
  onSave: (item: Omit<MenuItem, "id" | "created_at" | "updated_at">) => void;
};

function MenuItemPopup({ item, onClose, onSave }: MenuItemPopupProps) {
  const [name, setName] = useState(item?.name || "");
  const [description, setDescription] = useState(item?.description || "");
  const [price, setPrice] = useState(item?.price || 0);
  const [available, setAvailable] = useState(item?.available ?? true);
  const [category, setCategory] = useState(item?.category || "");

  const handleSave = () => {
    onSave({
      name,
      description,
      price,
      available,
      category: category || null,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">
          {item ? "Editar" : "Crear"}
        </h2>

        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border rounded px-3 py-2"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border rounded px-3 py-2 resize-none"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Price"
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="border rounded px-3 py-2"
          />
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
            />
            Available
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

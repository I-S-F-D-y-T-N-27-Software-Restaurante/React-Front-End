import React from "react";
import { Plus } from "lucide-react";
import { Navbar } from "@/components/Navbar";

interface Product {
  id: number;
  name: string;
  total: number;
}

const InventoryPage: React.FC = () => {
  const products: Product[] = [
    { id: 1, name: "Producto 1", total: 10 },
    { id: 2, name: "Producto 2", total: 8 },
    { id: 3, name: "Producto 3", total: 5 },
    { id: 4, name: "Producto 4", total: 12 },
    { id: 5, name: "Producto 4", total: 12 },
  ];

  return (
    <> 
      <Navbar />
    <div className="min-h-screen flex flex-col items-center justify-start py-20 bg-white">
      <h1 className="text-4xl font-semibold mb-12 text-center">
        Gestión de inventario
      </h1>

      <div className="w-full max-w-5xl flex flex-col gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between bg-gray-300 rounded-xl px-8 py-6 shadow-md text-lg font-medium text-gray-800"
          >
            <div className="w-1/3 text-left">{product.name}</div>
            <div className="w-1/3 text-center">
              Cantidad total: {product.total}
            </div>
            <div className="w-1/3 text-right">
              <button className="bg-red-900 hover:bg-red-500 cursor-pointer text-white px-6 py-2 rounded-full text-base font-semibold transition">
                Ver más +
              </button>
            </div>
          </div>
        ))}

        <button className=" cursor-pointer flex items-center justify-center gap-3 bg-gray-300 rounded-full py-4 text-lg font-medium text-gray-800 hover:bg-gray-400 transition mt-8">
          Añadir un nuevo producto
          <Plus size={22} />
        </button>
      </div>
    </div>
    </>
  );
};

export default InventoryPage;
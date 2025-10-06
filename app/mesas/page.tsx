import Navbar from "@/components/navbar";
import Link from 'next/link'

export default function MesasPage() {
const mesas = [
    { id: 1, estado: "LIBRE" },
    { id: 2, estado: "OCUPADO" },
    { id: 3, estado: "OCUPADA" },
    { id: 4, estado: "LIBRE" },
    { id: 5, estado: "LIBRE" },
    { id: 6, estado: "OCUPADA" },
    { id: 7, estado: "OCUPADA" },
];
return (
        <>  
        <Navbar />
        <div className="min-h-screen bg-white flex flex-col items-center p-4 justify-start">
            <h1 className="text-4xl font-semibold mt-5 mb-10">Gestion de mesas</h1>
            <div className="grid grid-cols-2 gap-x-25 gap-10  w-full max-w-5xl">
                {mesas.map((mesa) => (
            <div
                key={mesa.id}
                className={`rounded-lg h-30 flex flex-col items-center justify-center text-white font-bold ${
                mesa.estado === "LIBRE" ? "bg-green-500" : "bg-red-600"
                }`}
            >
                <span>MESA {mesa.id}</span>
                <span>{mesa.estado}</span>
            </div>
            ))}
            
            <Link href="/agregarMesa" className=" rounded-lg h-30 flex items-center justify-center bg-purple-100 text-2xl text-gray-700 font-bold hover:bg-purple-200 transition cursor-pointer">
            <button >
                +
            </button>
            </Link>
            </div>
        </div>
    </>
    );
}

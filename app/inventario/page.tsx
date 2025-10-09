import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex items-center justify-center align-center flex-col">
        <h1 className="text-4xl font-black text-gray-800 tracking-tight drop-shadow-lg">
          Inventario
        </h1>
        <h2>Work in progress</h2>
      </main>
    </>
  );
}

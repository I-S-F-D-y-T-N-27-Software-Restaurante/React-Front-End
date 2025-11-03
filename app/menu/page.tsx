import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { MenuDashboard } from "../../components/InventoryMenu";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex items-center justify-center align-center flex-col">
        <h1 className="text-4xl font-black text-gray-800 tracking-tight drop-shadow-lg mt-10">
          Menu
        </h1>
        <MenuDashboard />
      </main>
    </>
  );
}

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { RestaurantTable } from "@/components/Mesas";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex items-center justify-center align-center flex-col">
        <RestaurantTable />
      </main>
    </>
  );
}

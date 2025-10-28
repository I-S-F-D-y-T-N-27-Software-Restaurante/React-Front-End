import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { TableManager } from "@/components/Tables";
import { fetchAllTables } from "../../lib/fetch";
import { Suspense } from "react";
import { RestaurantTable } from "../../lib/types";
import { Spinner } from "../../components/Spinner";

export default async function Mesas() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex items-center justify-center align-center flex-col">
        <TableManager />
      </main>
    </>
  );
}

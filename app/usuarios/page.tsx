import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { UsersView } from "@/components/Usuarios";

export default function Usuarios() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex items-center justify-center align-center flex-col">
        <UsersView/>
      </main>
    </>
  );
}


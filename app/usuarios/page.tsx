import Link from "next/link";
import Navbar from "@/components/navbar";
import Users from "@/components/usuarios";

export default function Usuarios() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex items-center justify-center align-center flex-col">
        <Users/>
      </main>
    </>
  );
}


import Link from "next/link";
import Navbar from "@/components/navbar";
import Mesa from "@/components/mesas";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex items-center justify-center align-center flex-col">
        <Mesa/>
      </main>
    </>
  );
}

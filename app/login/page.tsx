"use client";
import { useState } from "react";
import { login } from "../../lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const user = await login(email, password);
      router.push("/");
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center align-center justify-center">
        <div className="mb-5">
          <img
            src="/loginuser.png"
            alt="icono de usuario"
            className="w-32 h-32 rounded-full"
          />
        </div>
        <h1 className="text-4xl mb-10 font-normal">Iniciar sesión</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-80 flex flex-col gap-3"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

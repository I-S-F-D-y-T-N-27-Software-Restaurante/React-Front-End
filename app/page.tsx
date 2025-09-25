import Link from 'next/link'
import Navbar from '@/components/navbar'


export default function Home() {
  return (
    <>
    <Navbar />
      <main className="min-h-screen bg-white flex items-center justify-center align-center">
        <div className="w-full max-w-5xl px-5 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-40 gap-y-10 justify-items-center">
            <Link href="/pedidos" className="block">
              <div
                className="w-80 h-80 rounded-md shadow-md flex items-center justify-center select-none bg-[#dcdc2a] hover:brightness-95 transition-all cursor-pointer"
                role="button"
              >
                <span className="text-white font-extrabold text-3xl tracking-wider uppercase">
                  Pedidos
                </span>
              </div>
            </Link>

            <Link href="/mesas" className="block" >
              <div
                className=" w-80 h-80  rounded-md shadow-md flex items-center justify-center select-none bg-[#dcdc2a] hover:brightness-95 transition-all cursor-pointer"
                role="button"
              >
                <span className="text-white font-extrabold text-3xl tracking-wider uppercase">
                  Mesas
                </span>
              </div>
            </Link>

            <Link href="/inventario" className="block">
            <div
              className="w-80 h-80  rounded-md shadow-md flex items-center justify-center select-none bg-[#dcdc2a] hover:brightness-95 transition-all cursor-pointer"
              role="button"
            >
              <span className="text-white font-extrabold text-3xl tracking-wider uppercase">
                Inventario
              </span>
            </div>
          </Link>

          <Link href="/usuarios" className="block">
            <div
              className="w-80 h-80  rounded-md shadow-md flex items-center justify-center select-none bg-[#dcdc2a] hover:brightness-95 transition-all cursor-pointer"
              role="button"
            >
              <span className="text-white font-extrabold text-3xl tracking-wider uppercase">
                Usuarios
              </span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  </>
  )
}
import Navbar from "@/components/navbar"

export default function CrearMesa() {
  return (
    < >
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-white ">
        <div className=" flex flex-col  items-center justify-center w-full max-w-200 gap-10 ">
          <h1 className="text-4xl font-semibold mb-10">Crear mesa</h1>
          <form className=" w-full max-w-200 flex flex-col gap-10">
            <div>
              <label className="block text-lg mb-4">Nº de mesa</label>
              <select className="w-full h-14 px-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-700">
                <option>Valor</option>
                <option>Mesa 1</option>
                <option>Mesa 2</option>
                <option>Mesa 3</option>
                <option>Mesa 4</option>
                <option>Mesa 5</option>
                <option>Mesa 6</option>
              </select>
            </div>
            <div>
              <label className=" block text-lg mb-4">Cantidad de personas</label>
              <select className="w-full h-14 px-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-700">
                <option>Valor</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
              </select>
            </div>
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="w-60 h-13 rounded-full text-white hover:opacity-95 bg-blue-800"
            >
              Crear 
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}



export default function LoginPage() {
    return (
    <>
    <div className="min-h-screen bg-white flex items-center justify-center ">
        <div className="w-full max-w-3xl min-h-[500px] px-5 ">
                <div className="flex flex-col items-center align-center justify-center">
                    <div className="mb-5">
                        <img
                        src="/loginuser.png"
                        alt="icono de usuario"
                        className="w-32 h-32 rounded-full"
                        />
                    </div>
                    <h1 className="text-4xl mb-10 font-normal">Iniciar sesión</h1>
                    <form className="w-full flex flex-col items-center">
                    <div className="w-full max-w-xl mb-6 text-1xl">
                        <input
                            placeholder="Usuario"
                            className="w-full h-12 px-4 text-1xl placeholder-gray-400 rounded-lg bg-[#e6e6e6] border border-gray-200 shadow-[0_2px_0_rgba(0,0,0,0.08)] focus:outline-none"
                        />
                    </div>
                    <div className="w-full max-w-xl mb-10 text-1xl">
                        <input
                            placeholder="Contraseña"
                            type="password"
                            className="w-full h-12 px-4 text-1xl placeholder-gray-400 rounded-lg bg-[#e6e6e6] border border-gray-200 shadow-[0_2px_0_rgba(0,0,0,0.08)] focus:outline-none"
                        />
                    </div>
                    <div className="">
                        <button
                            type="submit"
                            className="w-60 h-12 rounded-lg text-white text-1xl cursor-pointer hover:opacity-95 bg-blue-500"
                            >
                        Ingresar
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    );
}
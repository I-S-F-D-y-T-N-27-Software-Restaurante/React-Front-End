import { useRouter } from "next/navigation";
import { logOut } from "../lib/auth";

// No usar -> impl para cerrar si algo si el token se bugea
export function CloseButton() {
  const router = useRouter();

  return (
    <>
      <button
        onClick={async () => {
          try {
            const res = await logOut();
            router.push("/login");
          } catch (err: any) {
            console.log(err.message);
          }
        }}
        className="w-full text-left px-2 py-2 rounded-md hover:bg-purple-100 text-gray-700"
      >
        Close
      </button>
    </>
  );
}

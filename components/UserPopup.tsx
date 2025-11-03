"use client";
import {useRouter} from 'next/navigation';
import {PropsWithChildren} from 'react';
import {useUser} from '../hooks/useRoleContext';
import {logOut} from '../lib/auth';

export function UserPopup({onClose}: {onClose: () => void;}) {
  const router=useRouter();
  const {user, loading, error: userError}=useUser();

  const Wrapper=({children}: PropsWithChildren) => (
    <div className="absolute right-0 top-12 bg-white shadow-lg rounded-md w-60 py-4 px-4 z-50">
      <div className="flex flex-col items-start text-gray-800">{children}</div>

      <div className="border-t border-gray-200 my-3"></div>

      <button
        onClick={async () => {
          try {
            onClose();
            await logOut();
            router.push("/login");
          } catch (err: any) {
            console.log(err.message);
          }
        }}
        className="w-full text-left px-2 py-2 rounded-md hover:bg-purple-100 text-gray-700"
      >
        Cerrar sesión
      </button>
    </div>
  );

  return (
    <Wrapper>
      <div className="font-semibold text-lg truncate">
        Empleado:
      </div>
      <div className="text-sm text-gray-500 truncate my-1">
        {user?.user_email}
      </div>
      <div className="text-sm text-gray-500 my-2">
        <div className="flex flex-wrap gap-2">
          {user?.roles?.map((role: string, index: number) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium capitalize"
            >
              {role.toLowerCase().replace("_", " ")}
            </span>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

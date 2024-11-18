"use client";

import { useFormState, useFormStatus } from "react-dom";
import { resetPassword } from "@/actions";
import clsx from "clsx";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const [state, dispatch] = useFormState(resetPassword, undefined);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = (e.currentTarget.password as HTMLInputElement).value;

    if (!token) {
      alert("Token no válido");
      return;
    }

    dispatch({ token, password });
  };

  useEffect(() => {
    if (state?.ok) {
      const timer = setTimeout(() => {
        router.push("/auth/login");
      }, 2000); // Redirigir después de 2 segundos
      return () => clearTimeout(timer); // Limpiar timeout si el componente se desmonta
    }
  }, [state?.ok, router]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label htmlFor="password">Nueva contraseña</label>
      <input
        id="password"
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
        required
      />

      {state?.ok === true &&
        <p className="text-sm text-green-500 mb-2">
          Pasword reestablecido! Ahora serás redirigido al login.
        </p>
      }

      {state?.ok === false && (
        <p className="text-sm text-red-500 mb-2">
          No se pudo reestablecer la contraseña. {state.message}
        </p>
      )}

      <button
        type="submit"
        className={clsx("btn-primary", { "btn-disabled": useFormStatus().pending })}
        disabled={useFormStatus().pending}
      >
        Restablecer contraseña
      </button>
    </form>
  );
};

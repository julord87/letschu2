"use client";

import { useFormState, useFormStatus } from "react-dom";
import { resetPassword } from "@/actions";
import clsx from "clsx";

export const ResetPasswordForm = ({ token }: { token: string }) => {
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

      {state?.ok && (
        <p className="text-sm text-green-500">
          ¡Contraseña restablecida! Ahora puedes iniciar sesión.
        </p>
      )}

      {state?.message && (
        <p className="text-sm text-red-500">{state.message}</p>
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

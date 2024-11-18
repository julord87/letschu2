"use client";

import { sendResetEmail } from "@/actions";
import { useFormState, useFormStatus } from "react-dom";
import clsx from "clsx";

export const ForgotPasswordForm = () => {
  // useFormState espera una acción que acepte `state` y `payload`
  const [state, dispatch] = useFormState(sendResetEmail, undefined);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.email as HTMLInputElement).value;

    // Llamamos a dispatch con el payload
    dispatch({ email });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        id="email"
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
        required
      />

      {state?.ok === true &&
        <p className="text-sm text-green-500 mb-2">
          ¡Correo de recuperación enviado! Revisa tu bandeja de entrada.
        </p>
      }

      {state?.ok === false && (
        <p className="text-sm text-red-500 mb-2">
          No pudimos encontrar un usuario con ese correo. Intenta de nuevo.
        </p>
      )}

      <button
        type="submit"
        className={clsx("btn-primary", { "btn-disabled": useFormStatus().pending })}
        disabled={useFormStatus().pending}
      >
        Enviar enlace de recuperación
      </button>
    </form>
  );
};

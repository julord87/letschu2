import { titleFont } from '@/config/fonts';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <div className="px-5 mx-5">
        <Image
          src="/imgs/logo.png"
          alt="chu-logo"
          className="p-5 sm:p-0 mb-10"
          width={400}
          height={400}
        />
      </div>

      <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>

      <div className="flex flex-col">
        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
        />

        <label htmlFor="email">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
        />

        <button className="btn-primary">Ingresar</button>

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/new-account" className="btn-secondary text-center">
          Crear una nueva cuenta
        </Link>
      </div>
    </div>
  );
}
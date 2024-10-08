import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import Image from "next/image";

export default function Empty() {
  return (
    <div className="flex justify-center items-center h-[800px]">
      <div className="px-5 mx-5">
        <Image
          src="/imgs/logo.png"
          alt="chu-logo"
          className="p-5 sm:p-0 mb-2"
          width={400}
          height={400}
        />

        <div className="flex flex-row">
          <IoCartOutline size={80} className="mx-5" />

          <div className="flex flex-col items-center">
            <h1 className="text-xl mt-2">Tu carrito esta vacío</h1>

            <Link
              href={"/"}
              className="text-blue-500 mt-1 text-2xl font-semibold"
            >
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { AddressForm } from "./ui/AddressForm";
import { getCountries, getUserAdddress } from "@/actions";
import { auth } from "@/auth.config";
import { titleFont } from "@/config/fonts";
import { RetiroEnShowroomButton } from "./ui/RetiroEnShowRoomButton";

export default async function AddressPage() {
  const countries = await getCountries();

  const session = await auth();

  if (!session?.user) {
    return <h3 className="text-5xl">500 - No hay sesión de usuario</h3>;
  }

  const userAddress = (await getUserAdddress(session.user.id)) ?? undefined;

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <a href="/">
          <Image
            src="/imgs/logo.png"
            alt="logo"
            width={250}
            height={250}
            className="inline-block cursor-pointer my-4"
          />
        </a>

        <h1
          className={`${titleFont.className} capitalize antialiased text-4xl font-semibold mt-7 mb-4`}
        >
          Opciones de envio y retiro
        </h1>

        <span>
          {" "}
          <h3 className="text-lg mb-6">
            Completá el formulario con tu dirección y luego podrás elegir entre envío a domicilio o retiro en nuestro showroom de San Telmo, CABA.
          </h3>
        </span>

        <h2
          className={`${titleFont.className} capitalize antialiased text-2xl font-semibold mt-7 mb-4`}
        >
          Dirección
        </h2>

        <AddressForm countries={countries} userStoredAddress={userAddress} />
      </div>
    </div>
  );
}


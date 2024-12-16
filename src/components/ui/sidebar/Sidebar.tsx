"use client";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import Link from "next/link";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { logout } from "@/actions";
import { useSession } from "next-auth/react";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();

  const isAuthenticated = !!session?.user;
  const isAdminUser = session?.user.role === "admin";

  return (
    <div>
      {/* Background black*/}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>
      )}
      {/* Blur*/}
      {isSideMenuOpen && (
        <div
          className="fade-in fixed top-0 left-0 w-screen h-screen z-20 backdrop-filter backdrop-blur-sm"
          onClick={() => closeMenu()}
        ></div>
      )}
      {/* Sidemenu*/}
        <nav
          className={clsx(
            "fixed p-5 right-0 top-0 w-[75vw] sm:w-[400px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
            {
              "translate-x-full": !isSideMenuOpen,
            }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />

        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menu */}
        {isAuthenticated && (
          <>
            <Link
              href={"/profile"}
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonOutline size={20} />
              <span className="ml-5">Perfil</span>
            </Link>
            <Link
              href={"/orders"}
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={20} />
              <span className="ml-5">Ordenes</span>
            </Link>
          </>
        )}

        {!isAuthenticated && (
          <Link
            href={"/auth/login"}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => closeMenu()}
          >
            <IoLogInOutline size={20} />
            <span className="ml-5">Ingresar</span>
          </Link>
        )}

        {isAuthenticated && (
          <button
            className="w-full flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => logout().then(() => location.reload())}
          >
            <IoLogOutOutline size={20} />
            <span className="ml-5">Salir</span>
          </button>
        )}

        {isAuthenticated && isAdminUser && (
          <>
            {/* Line Separator */}
            <div className="w-full h-px bg-gray-200 my-10"></div>

            <Link
              href={"/admin/products"}
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={20} />
              <span className="ml-5">Productos</span>
            </Link>
            <Link
              href={"/admin/orders"}
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={20} />
              <span className="ml-5">Ordenes</span>
            </Link>
            <Link
              href={"/admin/users"}
              onClick={() => closeMenu()}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={20} />
              <span className="ml-5">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

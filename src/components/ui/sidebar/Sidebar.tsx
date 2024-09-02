"use client";
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5";
import Link from "next/link";
import { useUIStore } from "@/store";

export const Sidebar = () => {

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);

  return (
    <div>
      {/* Background black*/}
      <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>

      {/* Blur*/}
      <div className="fade-in fixed top-0 left-0 w-screen h-screen z-20 backdrop-filter backdrop-blur-sm"></div>

      {/* Sidemenu*/}
      // todo: slide fx
      <nav 
        className="fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300">

        <IoCloseOutline size={50} className="absolute top-5 right-5 cursor-pointer" onClick={() => console.log("click")} />

        {/* Input */}
        <div className="relative mt-14">
            <IoSearchOutline size={20} className="absolute top-2 left-2" />
            <input type="text" placeholder="Buscar" className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500" />
        </div>

        {/* Menu */}
        <Link
            href={"/"}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
            <IoPersonOutline size={20} />
            <span className="ml-5">Perfil</span>
        </Link>

        <Link
            href={"/"}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
            <IoTicketOutline size={20} />
            <span className="ml-5">Ordenes</span>
        </Link>

        <Link
            href={"/"}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
            <IoLogInOutline size={20} />
            <span className="ml-5">Ingresar</span>
        </Link>

        <Link
            href={"/"}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
            <IoLogOutOutline size={20} />
            <span className="ml-5">Salir</span>
        </Link>

        {/* Line Separator */}
        <div className="w-full h-px bg-gray-200 my-10"></div>

        <Link
            href={"/"}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
            <IoShirtOutline size={20} />
            <span className="ml-5">Productos</span>
        </Link>

        <Link
            href={"/"}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
            <IoTicketOutline size={20} />
            <span className="ml-5">Ordenes</span>
        </Link>

        <Link
            href={"/"}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
            <IoPeopleOutline size={20} />
            <span className="ml-5">Usuarios</span>
        </Link>

      </nav>
    </div>
  );
};

"use client";

import { useState, useEffect } from "react";
import { Footer, Sidebar, TopMenu } from "@/components";
import WhatsAppButton from "./components/WhatsAppButton";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [shouldShowWhatsAppButton, setShouldShowWhatsAppButton] = useState(false);

  useEffect(() => {
    // Rutas excluidas
    const excludedRoutes = ["/shop/admin"];
    const currentPath = window.location.pathname;

    // Determinar si el botón debe mostrarse
    const isExcluded = excludedRoutes.some((route) => currentPath.startsWith(route));
    setShouldShowWhatsAppButton(!isExcluded);
  }, []); // Ejecuta este efecto una vez en el montaje del componente

  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className="px-0 sm:px-10">{children}</div>
      <Footer />

      {/* Renderizar el botón de WhatsApp si debe mostrarse */}
      {shouldShowWhatsAppButton && <WhatsAppButton />}
    </main>
  );
}

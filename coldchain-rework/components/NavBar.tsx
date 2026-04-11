"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* 🟢 LOGO */}
        <div className="flex items-center">
          <Image
            src="/images/hero/logo.jpg" // <-- put your logo here
            alt="ColdChain logo"
            width={140}
            height={40}
            className="object-contain"
          />
        </div>

        {/* 🔗 NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">

          <a href="./productos/page.tsx" className="hover:text-[var(--color-primary)]">
            Inicio
          </a>


          {/* 📦 DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button className="hover:text-[var(--color-primary)]">
              Productos ▾
            </button>

            {open && (
              <div className="absolute top-full left-0 mt-3 w-64 bg-white border rounded-xl shadow-lg p-2">

                <a href="/productos/fertilizantes" className="block px-4 py-2 hover:bg-gray-100 rounded">
                  Agricultura
                </a>

                <a href="/productos/semillas" className="block px-4 py-2 hover:bg-gray-100 rounded">
                  Climatización
                </a>

                <a href="/productos/agroquimicos" className="block px-4 py-2 hover:bg-gray-100 rounded">
                  Instrumentos y Equipos de Medición
                </a>

                <a href="/productos/equipos" className="block px-4 py-2 hover:bg-gray-100 rounded">
                  Logistica y Transporte
                </a>

                <a href="/productos/otros" className="block px-4 py-2 hover:bg-gray-100 rounded">
                  Termohigrometros y Termógrafos
                </a>

              </div>
            )}
          </div>

          <a href="/contacto" className="hover:text-[var(--color-primary)]">
            Contacto
          </a>

        </div>

        {/* 🔥 CTA */}
        <a
          href="/contacto"
          className="hidden md:inline-block bg-[var(--color-primary)] text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition"
        >
          Cotizar
        </a>

      </div>

    </nav>
  );
}
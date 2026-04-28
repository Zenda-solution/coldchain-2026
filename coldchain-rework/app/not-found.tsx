import Link from "next/link";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada | Coldchain",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <section className="w-full bg-gradient-to-b from-blue-900 via-blue-800 to-blue-800 text-white min-h-[80vh] flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <p className="text-yellow-400 font-bold text-sm uppercase tracking-widest mb-4">Error 404</p>
          <h1 className="text-5xl sm:text-7xl font-black mb-6">404</h1>
          <p className="text-white/80 text-lg mb-10">
            La página que buscas no existe o ha sido movida.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/"
              className="bg-yellow-400 text-black px-7 py-3 rounded-full font-semibold transition hover:scale-105 shadow-md"
            >
              Volver al inicio
            </Link>
            <Link
              href="/productos"
              className="border border-white/40 px-7 py-3 rounded-full font-semibold transition hover:bg-white hover:text-blue-900"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

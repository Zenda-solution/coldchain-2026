import Link from "next/link";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gracias por contactarnos | Coldchain",
  description: "Hemos recibido tu mensaje. El equipo de Coldchain se pondrá en contacto contigo a la brevedad posible.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <section className="w-full bg-gradient-to-b from-blue-900 via-blue-800 to-blue-800 text-white pt-32 pb-24 min-h-[80vh] flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 text-center text-blue-900 animate-fade-in-up">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">¡Gracias por contactarnos!</h1>
            <p className="text-gray-600 text-base sm:text-lg mb-8">
              Hemos recibido tu mensaje correctamente. Nuestro equipo revisará la información de tu proyecto y nos pondremos en contacto contigo a la brevedad posible.
            </p>
            
            <Link 
              href="/"
              className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold transition hover:scale-105 shadow-md"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

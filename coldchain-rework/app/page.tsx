import Carousel from "@/components/Carousel";
import { About } from "@/components/About";
import { Products } from "@/components/Products";
import { MisionVision } from "@/components/Misionvision";
import { CTA } from "@/components/CTA";
import { ContactForm } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { CTA_TEXTS, ROUTES } from "@/lib/siteConfig";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coldchain | Equipos de Medición para Agricultura e Industria en Ecuador",
  description:
    "Más de 30 años proveyendo equipos de medición y análisis para agricultura, floricultura, laboratorio e industria en Ecuador. Cotiza con Coldchain.",
  alternates: {
    canonical: "https://coldchain.com.ec",
  },
  openGraph: {
    title: "Coldchain | Equipos de Medición en Ecuador",
    description:
      "Más de 30 años proveyendo equipos de medición y análisis para agricultura, floricultura, laboratorio e industria en Ecuador.",
    url: "https://coldchain.com.ec",
    type: "website",
  },
  twitter: {
    title: "Coldchain | Equipos de Medición en Ecuador",
    description:
      "Más de 30 años proveyendo equipos de medición y análisis para agricultura, floricultura, laboratorio e industria en Ecuador.",
  },
};


export default function Hero() {
  return (
    <>
      <section className="w-full bg-gradient-to-b from-blue-900 via-blue-800 to-blue-100 text-white pt-12 sm:pt-16 pb-16 overflow-x-hidden">

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-5 sm:gap-6">

          {/* TRUST BADGE */}
          <div className="animate-fade-in-up px-4 py-1 rounded-full border border-white/20 bg-white/5 text-xs sm:text-sm text-white/80">
            +30 años en el mercado ecuatoriano
          </div>

          {/* TITLE */}
          <h1 className="animate-fade-in-up-delayed w-full text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]">
            Precisión y{" "}
            <span className="text-yellow-400">confianza</span>
            <br />
            para el sector agrícola
          </h1>

          {/* DESC */}
          <p className="animate-fade-in-up-slow w-full max-w-4xl text-white/80 text-base sm:text-lg">
            Equipos de medición y análisis diseñados para optimizar procesos,
            mejorar la calidad y garantizar resultados confiables.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up-delayed flex gap-3 flex-wrap justify-center mt-1 sm:mt-2">
            <Link
              href={ROUTES.products}
              className="group bg-yellow-400 text-black px-6 sm:px-7 py-2.5 rounded-full font-semibold flex items-center gap-2 transition hover:scale-105 cursor-pointer text-sm sm:text-base"
            >
              {CTA_TEXTS.viewCatalogLabel}
              <span className="transition group-hover:translate-x-1">→</span>
            </Link>

            <Link
              href={ROUTES.contact}
              className="border border-white/40 px-6 sm:px-7 py-2.5 rounded-full font-semibold transition hover:bg-white hover:text-blue-900 cursor-pointer text-sm sm:text-base"
            >
              {CTA_TEXTS.contactLabel}
            </Link>
          </div>

          {/* CAROUSEL */}
          <div className="animate-fade-in-up-slow w-full mt-3 sm:mt-4">
            <Carousel />
          </div>

        </div>

        {/* SECTIONS */}
        <div className="mt-8 sm:mt-10">
          <About />
        </div>

        <div className="mt-8 sm:mt-10">
          <Products />
        </div>

        <div className="mt-14 sm:mt-20">
          <MisionVision />
        </div>

        <div className="mt-14 sm:mt-20">
          <CTA />
        </div>

      </section>

      <ContactForm />
      <Footer />

       <FloatingWhatsApp />
    </>
  );
}
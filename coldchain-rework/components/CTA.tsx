import Image from "next/image";
import { WHATSAPP, CTA_TEXTS } from "@/lib/siteConfig";

export function CTA() {
  return (
    <section className="relative pt-16 sm:pt-24 md:pt-32 overflow-hidden">

      {/* CLOUDS — clipped so they never overflow the viewport */}
      <Image
        src="/images/hero/cloud-left.webp"
        alt=""
        aria-hidden="true"
        width={500}
        height={300}
        className="absolute -left-10 top-6 w-[180px] sm:w-[300px] md:w-[500px] opacity-60 pointer-events-none select-none"
      />
      <Image
        src="/images/hero/cloud-right.webp"
        alt=""
        aria-hidden="true"
        width={500}
        height={300}
        className="absolute -right-10 top-12 w-[180px] sm:w-[300px] md:w-[500px] opacity-60 pointer-events-none select-none"
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-[1000px] mx-auto px-5 sm:px-6 text-center flex flex-col items-center gap-5 md:gap-6">

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-[1.15]">
          Es momento de{" "}
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-lg shadow-sm inline-block">
            optimizar
          </span>
          <br />
          tu operación
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-blue-900/70 max-w-2xl">
          Trabajemos juntos para mejorar tus procesos, reducir errores y llevar tu negocio al siguiente nivel.
        </p>

        <div className="mt-4 md:mt-6 flex gap-4 flex-wrap justify-center">
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(CTA_TEXTS.startConversationMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            aria-label={CTA_TEXTS.startConversationLabel}
            className="group bg-yellow-400 text-black px-7 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold
                       flex items-center gap-2 transition hover:scale-105 shadow-md cursor-pointer cta-commence"
          >
            {CTA_TEXTS.startConversationLabel}
            <span className="transition group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      {/* FULL-WIDTH IMAGE */}
      <div className="w-full mt-12 md:mt-20 relative">
        <Image
          src="/images/hero/CTA3.webp"
          alt="Campo"
          width={1200}
          height={600}
          className="w-full h-auto object-contain"
        />
      </div>

    </section>
  );
}
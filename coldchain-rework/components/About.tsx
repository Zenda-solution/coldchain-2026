"use client";

import { useRef } from "react";

const stats = [
  { value: "+30", label: "Años de trayectoria" },
  { value: "5", label: "Sectores atendidos" },
  { value: "100%", label: "Soporte técnico local" },
];

const pillars = [
  {
    icon: "◈",
    title: "Importación especializada",
    body: "Representamos marcas líderes a nivel mundial, garantizando equipos certificados y con respaldo de fábrica.",
  },
  {
    icon: "◉",
    title: "Soluciones a la medida",
    body: "Cada cliente recibe una propuesta adaptada a sus procesos, con acompañamiento desde la selección hasta la puesta en marcha.",
  },
  {
    icon: "◎",
    title: "Servicio técnico eficiente",
    body: "Contamos con un equipo técnico propio para calibración, mantenimiento y soporte post-venta en todo el Ecuador.",
  },
  {
    icon: "◌",
    title: "Marcas internacionales",
    body: "Trabajamos con productos y marcas reconocidas internacionalmente, como Hanna Instruments, para asegurar precisión, confiabilidad y respaldo técnico.",
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div
          className="
            relative rounded-[32px] border border-white/20
            bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(248,250,252,0.98)_100%)]
            shadow-[0_20px_70px_rgba(10,36,99,0.14)]
            px-6 sm:px-8 md:px-12
            py-10 md:py-14
            overflow-hidden
          "
        >
          {/* ambient accents */}
          <div className="pointer-events-none absolute top-0 left-0 h-full w-2 bg-[#0a2463]" />
          <div className="pointer-events-none absolute top-10 right-10 h-24 w-24 rounded-full bg-yellow-400/10 blur-2xl" />
          <div className="pointer-events-none absolute bottom-8 left-24 h-28 w-28 rounded-full bg-[#0a2463]/[0.06] blur-3xl" />

          {/* ── Header + Circle ── */}
          <div
            data-about-header
            className="grid md:grid-cols-2 gap-10 items-center mb-14 md:mb-18"
          >
            {/* LEFT — TEXT */}
            <div className="max-w-3xl">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-yellow-500 mb-4">
                Sobre Nosotros
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0a2463] tracking-tight leading-[1.08] mb-5">
                La empresa detrás de las
                <br className="hidden sm:block" /> mejores operaciones del Ecuador
              </h2>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                <strong className="text-[#0a2463]">COLDCHAIN</strong> es una empresa
                ecuatoriana con cerca de 30 años dedicada a la importación y
                distribución de insumos, instrumentos y equipos especializados para
                los sectores floricultor, alimentario, logístico, farmacéutico e
                industrial.
              </p>
            </div>

            {/* RIGHT — YELLOW CIRCLE */}
            <div className="relative w-full flex items-center justify-center">
              <div
                className="
                  relative
                  w-[200px] h-[200px]
                  sm:w-[260px] sm:h-[260px]
                  md:w-[300px] md:h-[300px]
                  rounded-full
                  bg-[#fac800]
                  opacity-100
                  flex items-center justify-center
                 
                "
              >
                
                {/* Ecuador map */}
                <img
                  src="/images/hero/about4.png" // 🔁 replace with your file
                  alt="Cobertura en Ecuador"
                  className="relative z-10 w-[120%] h-[120%] object-contain opacity-100 scale-110"
                />
              </div>

              {/* floating accent */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-[#0a2463]/10 rounded-full blur-xl" />
            </div>
          </div>

  
          
          {/* ── Pillar cards ── */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="
                  group relative rounded-2xl border border-[#0a2463]/8
                  bg-white/88 backdrop-blur-sm
                  p-7 sm:p-8
                  hover:-translate-y-1
                  hover:border-yellow-400/50
                  hover:shadow-[0_10px_36px_rgba(10,36,99,.10)]
                  transition-all duration-300
                "
              >
                <div className="absolute top-0 left-8 w-8 h-[3px] rounded-full bg-yellow-400 group-hover:w-14 transition-all duration-300" />

                <span className="text-2xl text-[#0a2463]/30 mb-4 block">
                  {p.icon}
                </span>

                <h3 className="text-base sm:text-lg font-bold text-[#0a2463] mb-3">
                  {p.title}
                </h3>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
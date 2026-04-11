export function CTA() {
  return (
    <section className="relative pt-32 overflow-hidden">

      {/* NUBES IZQUIERDA */}
      <img
        src="/images/hero/cloud-left.webp"
        alt="nube"
        className="absolute -left-20 top-10 w-[300px] md:w-[500px] opacity-60 pointer-events-none"
      />

      {/* NUBES DERECHA */}
      <img
        src="/images/hero/cloud-right.png"
        alt="nube"
        className="absolute -right-20 top-20 w-[300px] md:w-[500px] opacity-60 pointer-events-none"
      />

      {/* CONTENIDO */}
      <div className="relative z-10 max-w-[1000px] mx-auto px-6 text-center flex flex-col items-center gap-6">

        <h2 className="text-4xl md:text-6xl font-bold text-blue-900 leading-[1.1]">
          Es momento de{" "}
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-lg shadow-sm">
            optimizar
          </span>
          <br />
          tu operación
        </h2>

        <p className="text-lg md:text-xl text-blue-900/70 max-w-2xl">
          Trabajemos juntos para mejorar tus procesos, reducir errores y llevar tu negocio al siguiente nivel.
        </p>

        <div className="mt-6 flex gap-4 flex-wrap justify-center">
          <a className="group bg-yellow-400 text-black px-8 py-3 rounded-full text-lg font-semibold flex items-center gap-2 transition hover:scale-105 shadow-md">
            Comenzar Conversación
            <span className="transition group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      {/* IMAGEN FULL WIDTH */}
      <div className="w-full mt-20">
        <img
          src="/images/hero/CTA3.png"
          alt="Campo"
          className="w-full h-auto object-contain"
        />
      </div>

    </section>
  );
}
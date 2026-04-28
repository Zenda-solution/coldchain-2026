import Image from 'next/image';

export function MisionVision() {
  return (
    <div className="space-y-12 md:space-y-20 relative z-10 px-4 sm:px-6">

      {/* MISIÓN */}
      <div className="flex flex-col md:flex-row items-stretch gap-0 md:gap-6 rounded-2xl overflow-hidden shadow-md">

        {/* Text — full width on mobile, flex-1 on desktop */}
        <div className="bg-gradient-to-b from-white to-gray-50 p-8 md:p-10 flex flex-col justify-center
                        border-b md:border-b-0 md:border-r border-gray-200
                        md:rounded-r-2xl flex-1">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Nuestra Misión
          </h3>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            En Coldchain, proveemos soluciones integrales, confiables e innovadoras mediante la importación y distribución de insumos y equipos de alta calidad para sectores estratégicos del país. Nos especializamos en ofrecer atención personalizada, soporte técnico eficiente y precios competitivos, con el firme propósito de facilitar tu operación, optimizar tus procesos y aportar al crecimiento y sostenibilidad de tu negocio. Nuestro servicio cercano, profesional y adaptado a tus necesidades es la base para construir relaciones sólidas y duraderas.
          </p>
        </div>

        {/* Image — 260px tall on mobile, fixed square on desktop */}
        <div className="w-full h-64 md:w-[420px] md:h-auto md:min-h-[400px] overflow-hidden flex-shrink-0 relative">
          <Image
            src="/images/hero/mision.webp"
            alt="Misión"
            fill
            sizes="(max-width: 767px) 100vw, 420px"
            className="object-cover"
          />
        </div>
      </div>

      {/* VISIÓN */}
      <div className="flex flex-col-reverse md:flex-row items-stretch gap-0 md:gap-6 rounded-2xl overflow-hidden shadow-md">

        {/* Image */}
        <div className="w-full h-64 md:w-[420px] md:h-auto md:min-h-[400px] overflow-hidden flex-shrink-0 relative">
          <Image
            src="/images/hero/vision.webp"
            alt="Visión"
            fill
            sizes="(max-width: 767px) 100vw, 420px"
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div className="bg-gradient-to-b from-white to-gray-50 p-8 md:p-10 flex flex-col justify-center
                        border-b md:border-b-0 md:border-l border-gray-200
                        md:rounded-l-2xl flex-1">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Nuestra Visión
          </h3>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Consolidarnos como el referente principal en el mercado ecuatoriano para empresas que buscan insumos y productos especializados, posicionándonos como un aliado estratégico por nuestra eficiencia, compromiso, servicio técnico de excelencia y capacidad para ofrecer soluciones a la medida de cada cliente.
          </p>
        </div>
      </div>

    </div>
  );
}
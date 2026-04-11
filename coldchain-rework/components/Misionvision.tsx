export function MisionVision() {
  return (
    <div className="space-y-20 relative z-10">

      {/* MISIÓN */}
      <div className="flex items-center gap-6">
        {/* Texto desde borde izquierdo */}
        <div className="h-[500px] bg-gradient-to-b from-white to-gray-50 rounded-r-2xl p-10 shadow-md flex flex-col justify-center border-r border-gray-200 flex-1">
          <h3 className="text-4xl font-bold text-blue-900 mb-4">Nuestra Misión</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            En Coldchain, proveemos soluciones integrales, confiables e innovadoras mediante la importación y distribución de insumos y equipos de alta calidad para sectores estratégicos del país. Nos especializamos en ofrecer atención personalizada, soporte técnico eficiente y precios competitivos, con el firme propósito de facilitar tu operación, optimizar tus procesos y aportar al crecimiento y sostenibilidad de tu negocio. Nuestro servicio cercano, profesional y adaptado a tus necesidades es la base para construir relaciones sólidas y duraderas.
          </p>
        </div>

        {/* Imagen fija */}
        <div className="w-[500px] h-[500px] overflow-hidden rounded-2xl shadow-md">
          <img
            src="/images/hero/mision.jpg"
            alt="Misión"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* VISIÓN */}
      <div className="flex items-center gap-6">
        {/* Imagen fija */}
        <div className="w-[500px] h-[500px] overflow-hidden rounded-2xl shadow-md">
          <img
            src="/images/hero/vision.jpg"
            alt="Visión"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Texto hasta borde derecho */}
        <div className="h-[500px] bg-gradient-to-b from-white to-gray-50 rounded-l-2xl p-10 shadow-md flex flex-col justify-center border-l border-gray-200 flex-1">
          <h3 className="text-4xl font-bold text-blue-900 mb-4">Nuestra Visión</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Consolidarnos como el referente principal en el mercado ecuatoriano para empresas que buscan insumos y productos especializados, posicionándonos como un aliado estratégico por nuestra eficiencia, compromiso, servicio técnico de excelencia y capacidad para ofrecer soluciones a la medida de cada cliente.
          </p>
        </div>
      </div>

    </div>
  );
}
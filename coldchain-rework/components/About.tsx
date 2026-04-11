import { CheckCircle } from "lucide-react"; // ejemplo de icono

export function About() {
  return (
    <section className="max-w-[1350px] mx-auto bg-white rounded-[40px] py-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 tracking-tight">
            ¿Quiénes somos?
          </h2>
          <p className="mt-4 text-lg md:text-xl font-medium text-blue-800">
            Con más de 30 años liderando soluciones para sectores estratégicos.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid md:grid-cols-2 gap-12 text-gray-700 text-lg md:text-xl leading-relaxed">

          {/* LEFT COLUMN */}
          <div className="space-y-8">
            <p className="flex items-start gap-3">
              <CheckCircle className="text-yellow-400 mt-1 shrink-0" size={24} />
              <span>
                <strong className="text-blue-900">COLDCHAIN</strong> es una empresa ecuatoriana con cerca de 30 años de trayectoria, dedicada a la importación y distribución de insumos, instrumentos y equipos especializados para sectores clave como el <strong>floricultor</strong>, <strong>alimentario</strong>, <strong>logístico</strong>, <strong>farmacéutico</strong> e <strong>industrial</strong>.
              </span>
            </p>

            <p className="flex items-start gap-3">
              <CheckCircle className="text-yellow-400 mt-1 shrink-0" size={24} />
              <span>
                Nuestra experiencia y conocimiento del mercado nos permiten ofrecer <strong>soluciones eficientes, confiables y adaptadas a las necesidades de cada cliente</strong>.
              </span>
            </p>

            
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            <p className="flex items-start gap-3">
              <CheckCircle className="text-yellow-400 mt-1 shrink-0" size={24} />
              <span>
                Nos destacamos por brindar un servicio integral que incluye <strong className="text-gray-800">atención personalizada, entregas oportunas y soporte técnico especializado</strong>.
              </span>
            </p>

            <p className="flex items-start gap-3">
              <CheckCircle className="text-yellow-400 mt-1 shrink-0" size={24} />
              <span>
                Nuestro equipo humano, altamente comprometido, trabaja con enfoque en la <strong>eficiencia, rapidez y mejora continua</strong>, asegurando una experiencia de calidad en cada etapa del proceso comercial.
              </span>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
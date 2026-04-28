"use client";

import { useRouter } from "next/navigation";

export function ContactForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/gracias");
  };

  return (
    /*
      The -mt-24 overlap looks great on desktop but causes the card to sit
      under the section above on narrow screens. We zero it out on mobile
      and restore it on md+.
    */
    <section className="relative mt-0 md:-mt-24 py-16 sm:py-20 md:py-28 bg-yellow-400">

      <div className="max-w-[800px] mx-auto px-4 sm:px-6">

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">

          {/* HEADER */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">
              Hablemos de tu proyecto
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Cuéntanos qué necesitas y te ayudaremos a encontrar la mejor solución.
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>

            {/* NOMBRE + EMPRESA — stack on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Nombre completo"
                className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 bg-gray-50 shadow-inner focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base transition-colors"
              />
              <input
                type="text"
                placeholder="Empresa"
                className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 bg-gray-50 shadow-inner focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base transition-colors"
              />
            </div>

            {/* EMAIL + TEL — stack on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 bg-gray-50 shadow-inner focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base transition-colors"
              />
              <input
                type="tel"
                placeholder="Teléfono (opcional)"
                className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 bg-gray-50 shadow-inner focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base transition-colors"
              />
            </div>

            {/* SELECT */}
            <select className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 bg-gray-50 shadow-inner focus:bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base transition-colors">
              <option>¿En qué estás interesado?</option>
              <option>Agro</option>
              <option>Florícola</option>
              <option>Alimentos</option>
              <option>Industria</option>
            </select>

            {/* MENSAJE */}
            <textarea
              placeholder="Cuéntanos un poco más sobre lo que necesitas..."
              className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 bg-gray-50 shadow-inner focus:bg-white h-32 sm:h-36 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base transition-colors"
            />

            {/* SUBMIT */}
            <div className="text-center pt-2 sm:pt-4">
              <button
                type="submit"
                className="group bg-yellow-400 text-black px-7 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold
                           flex items-center gap-2 mx-auto transition hover:scale-105 shadow-md"
              >
                Enviar mensaje
                <span className="transition group-hover:translate-x-1">→</span>
              </button>
            </div>

          </form>
        </div>
      </div>

    </section>
  );
}
export function ContactForm() {
  return (
    <section className="relative -mt-24 py-28 bg-yellow-400">

      {/* CONTENEDOR */}
      <div className="max-w-[800px] mx-auto px-6">

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
              Hablemos de tu proyecto
            </h2>
            <p className="text-gray-600 mt-2">
              Cuéntanos qué necesitas y te ayudaremos a encontrar la mejor solución.
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-6">

            {/* NOMBRE + EMPRESA */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nombre completo"
                className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="text"
                placeholder="Empresa"
                className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* EMAIL + TEL */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="tel"
                placeholder="Teléfono (opcional)"
                className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* SELECT */}
            <div>
              <select className="w-full p-4 rounded-xl border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <option>¿En qué estás interesado?</option>
                <option>Agro</option>
                <option>Florícola</option>
                <option>Alimentos</option>
                <option>Industria</option>
              </select>
            </div>

            {/* MENSAJE */}
            <textarea
              placeholder="Cuéntanos un poco más sobre lo que necesitas..."
              className="w-full p-4 rounded-xl border border-gray-300 h-36 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            {/* BOTÓN */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="group bg-yellow-400 text-black px-8 py-3 rounded-full text-lg font-semibold flex items-center gap-2 mx-auto transition hover:scale-105 shadow-md"
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
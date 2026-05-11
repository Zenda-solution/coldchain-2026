"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqenwjyz';

export function ContactForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
    website: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot anti-spam field
    if (formData.website) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          interest: formData.interest,
          message: formData.message,

          // Optional: better email subject inside Formspree
          _subject: `Nuevo mensaje de ${formData.name} - Coldchain`,
        }),
      });

      if (res.ok) {
        router.push("/gracias");
      } else {
        const data = await res.json().catch(() => null);

        setStatus("error");
        setErrorMessage(
          data?.errors?.[0]?.message ||
            "No se pudo enviar el formulario. Intenta nuevamente."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("No se pudo conectar con Formspree.");
    }
  };

  const inputClass =
    "w-full p-3 sm:p-4 rounded-xl border border-gray-300 bg-gray-50 shadow-inner focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base transition-colors";

  return (
    <section className="relative mt-0 md:-mt-24 py-16 sm:py-20 md:py-28 bg-yellow-400">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">
              Hablemos de tu proyecto
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Cuéntanos qué necesitas y te ayudaremos a encontrar la mejor solución.
            </p>
          </div>

          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                name="name"
                placeholder="Nombre completo"
                required
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                type="text"
                name="company"
                placeholder="Empresa"
                value={formData.company}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                required
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Teléfono (opcional)"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <select
              name="interest"
              required
              value={formData.interest}
              onChange={handleChange}
              className={`${inputClass} text-gray-600`}
            >
              <option value="" disabled>
                ¿En qué estás interesado?
              </option>
              <option value="Agro">Agro</option>
              <option value="Florícola">Florícola</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Industria">Industria</option>
            </select>

            <textarea
              name="message"
              placeholder="Cuéntanos un poco más sobre lo que necesitas..."
              required
              value={formData.message}
              onChange={handleChange}
              className={`${inputClass} h-32 sm:h-36 resize-none`}
            />

            {status === "error" && (
              <p className="text-red-500 text-sm text-center">
                Hubo un error al enviar el mensaje.{" "}
                {errorMessage || "Por favor intenta de nuevo."}
              </p>
            )}

            <div className="text-center pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="group bg-yellow-400 text-black px-7 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold
                           flex items-center gap-2 mx-auto transition hover:scale-105 shadow-md
                           disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {status === "loading" ? "Enviando..." : "Enviar mensaje"}
                {status !== "loading" && (
                  <span className="transition group-hover:translate-x-1">→</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
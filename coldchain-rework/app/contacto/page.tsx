import { ContactForm } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Coldchain Ecuador",
  description:
    "Ponté en contacto con Coldchain. Visítanos en Quito, llámanos o escríbenos. Expertos en equipos de medición para agricultura, laboratorio e industria en Ecuador.",
  alternates: {
    canonical: "https://coldchain.com.ec/contacto",
  },
  openGraph: {
    title: "Contacto | Coldchain Ecuador",
    description:
      "Ponté en contacto con Coldchain. Expertos en equipos de medición para agricultura, laboratorio e industria en Ecuador.",
    url: "https://coldchain.com.ec/contacto",
    type: "website",
  },
  twitter: {
    title: "Contacto | Coldchain Ecuador",
    description:
      "Ponté en contacto con Coldchain. Expertos en equipos de medición para agricultura e industria en Ecuador.",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="w-full bg-gradient-to-b from-blue-900 via-blue-800 to-blue-800 text-white pt-24 sm:pt-32 pb-16 md:pb-32 overflow-x-hidden min-h-[70vh]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-6">
              Estamos aquí para <span className="text-yellow-400">ayudarte</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/80 text-lg sm:text-xl">
              Ponte en contacto con nuestro equipo de expertos. Visítanos, llámanos o escríbenos y con gusto te atenderemos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Details */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col justify-center text-blue-900">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-yellow-500">Información de Contacto</h2>
              
              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Ubicación</h3>
                    <p className="text-gray-600">Jorge Icaza N12F y Calle B a 300 metros de la calle Sebastián de Benalcázar.</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Teléfonos</h3>
                    <p className="text-gray-600">
                      Ventas: (593) 098 700 4993 <br/>
                      Ventas: (593) 099 923 0340 <br/>
                      Soporte: (593) 98 558 3892
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Correo Electrónico</h3>
                    <p className="text-gray-600">
                      ventas1@coldchain.com.ec<br/>
                      ventas2@coldchain.com.ec<br/>
                      ventas3@coldchain.com.ec<br/>
                      tecnico@coldchain.com.ec<br/>
                      atencionalcliente@coldchain.com.ec
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Map */}
            <div className="h-full min-h-[400px] w-full bg-white/10 border border-white/20 rounded-3xl overflow-hidden backdrop-blur-md relative">
              <iframe 
                src="https://www.google.com/maps?q=-0.270873486995697,-78.46299743652344&z=15&hl=en&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '400px' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>

        </div>
      </section>

      <ContactForm />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
